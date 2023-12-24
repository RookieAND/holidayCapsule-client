import { atom } from 'jotai';

import { type ModalType, modalAtom } from './store';

export const addModalAtom = atom(
    (get) => get(modalAtom),
    (get, set, newModal: ModalType) => {
        const prevAtom = get(modalAtom);
        set(modalAtom, {
            modal: newModal,
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
