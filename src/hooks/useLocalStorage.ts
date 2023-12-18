import { useCallback, useEffect, useRef, useState } from 'react';

const getStorageValue = <T>(key: string, init: T) => {
    if (window === undefined) return init;

    try {
        const value = window.localStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : init;
    } catch (error) {
        return init;
    }
};

const useLocalStorageValue = <T>(key: string, init: T) => {
    const initValueRef = useRef(init);

    const [storageValue, setStorageValue] = useState(
        getStorageValue(key, initValueRef.current),
    );

    useEffect(() => {
        setStorageValue(getStorageValue(key, initValueRef.current));

        const subscribeChangeStorageEvent = (event: StorageEvent) => {
            if (event.key && event.key !== key) return;
            setStorageValue(JSON.parse(event.newValue || ''));
        };

        // Storage 커스텀 이벤트가 관측될 때마다, 새로운 값을 적용해야 함.
        window.addEventListener('storage', subscribeChangeStorageEvent);

        return () => {
            window.removeEventListener('storage', subscribeChangeStorageEvent);
        };
    });

    return storageValue;
};

const useLocalStorageSetter = <T>(key: string, init: T) => {
    const initialValueRef = useRef(init);

    const setStorageValue = useCallback(
        (value: T) => {
            if (typeof window === 'undefined') return;
            const storedValue = getStorageValue(key, initialValueRef.current);
            const updatedValue =
                value instanceof Function ? value(storedValue) as T : value;

            window.localStorage.setItem(key, JSON.stringify(updatedValue));

            // localStorage 에 새로운 값을 세팅한 후, Event 를 구독 중인 대상에게 변화 알림.
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key,
                    oldValue: JSON.stringify(storedValue),
                    newValue: JSON.stringify(updatedValue),
                }),
            );
        },
        [key],
    );

    return setStorageValue;
};

type LocalStorageSetter<T> = (value: T) => void;

/**
 * LocalStorage 에 저장된 값을 State 처럼 사용하도록 하는 Hook useLocalStorage
 * @see https://usehooks-ts.com/react-hook/use-local-storage
 */
export const useLocalStorage = <T>(
    key: string,
    init: T,
): [T, LocalStorageSetter<T>] => {
    const storedValue = useLocalStorageValue(key, init);
    const setStoredValue = useLocalStorageSetter(key, init);

    return [storedValue, setStoredValue];
};
