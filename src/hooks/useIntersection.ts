import { useEffect, useRef } from 'react';

/**
 * 훅이 반환한 Ref 에 Observer 를 부착시켜 요소의 교차를 관측하는 useIntersection
 */
const useIntersection = (
    onIntersect: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
) => {
    const observerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(onIntersect, options);
        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [onIntersect, options]);

    return observerRef;
};

export default useIntersection;
