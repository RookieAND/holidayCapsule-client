import { atom } from 'jotai';

import { type ModalType, modalAtom } from './store';

export const addModalAtom = atom(
    (get) => get(modalAtom),
    (get, set, { title, children }: Omit<ModalType, 'sequence'>) => {
        const prevAtom = get(modalAtom);
        console.log(title);
        set(modalAtom, {
            modalQueue: [...prevAtom.modalQueue, { title, children }],
            shared: prevAtom.shared,
        });
    },
);

export const removeModalAtom = atom(
    (get) => {
        const prevAtom = get(modalAtom);
        return { shared: prevAtom.shared, modalQueue: prevAtom.modalQueue };
    },
    (get, set) => {
        const prevAtom = get(modalAtom);
        set(modalAtom, {
            modalQueue: prevAtom.modalQueue.slice(1),
            shared: prevAtom.shared,
        });
    },
);
