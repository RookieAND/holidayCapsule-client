import { atom } from 'jotai';

import { type ToastType, toastAtom } from './store';

export const addToastAtom = atom(
    (get) => get(toastAtom),
    (get, set, newToast: Omit<ToastType, 'sequence'>) => {
        const prevAtom = get(toastAtom);
        const waitingToastAmount = prevAtom.toastQueue.length;

        // NOTE : 토스트가 6개 이상 쌓였을 경우에는 더 이상 쌓이지 않도록 한다.
        if (waitingToastAmount > 6) return;

        set(toastAtom, {
            toastQueue: [
                ...prevAtom.toastQueue,
                { ...newToast, sequence: prevAtom.sequence },
            ],
            sequence: prevAtom.sequence + 1,
        });
    },
);

export const removeToastAtom = atom(
    (get) => get(toastAtom),
    (get, set, sequence: number) => {
        const prevAtom = get(toastAtom);
        set(toastAtom, { 
            toastQueue: prevAtom.toastQueue.filter((toast) => toast.sequence !== sequence),
            sequence: prevAtom.sequence,
         });
    },
);
