import { useEffect, useRef } from 'react';

interface UseIntervalProps {
    callback: (...args: any[]) => any;
    delay: number;
}

export const useInterval = ({ callback, delay }: UseIntervalProps) => {
    const savedCallbackRef = useRef<typeof callback | null>();

    useEffect(() => {
        savedCallbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () =>
            savedCallbackRef.current && savedCallbackRef.current();
        const intervalId = setInterval(tick, delay);
        return () => clearInterval(intervalId);
    });
};
