import { useSetAtom } from 'jotai';

import { addModalAtom, removeModalAtom } from '#/stores/modal/action';
import { ModalType } from '#/stores/modal/store';

export const useModal = () => {
    const addModal = useSetAtom(addModalAtom);
    const removeModal = useSetAtom(removeModalAtom);
    return {
        open: ({ title, children }: ModalType) => addModal({ title, children }),
        close: removeModal,
    };
};
