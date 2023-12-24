import { atom } from 'jotai';

import { type ModalType, modalAtom } from './store';

export const addModalAtom = atom(
    (get) => get(modalAtom),
    (get, set, { title, children }: ModalType) => {
        const prevAtom = get(modalAtom);
        set(modalAtom, {
            modal: { title, children },
        });
    },
);

export const removeModalAtom = atom(
    (get) => get(modalAtom),
    (get, set) => {
        const prevAtom = get(modalAtom);
        set(modalAtom, { modal: undefined });
    },
);
