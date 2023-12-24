import { useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { type ModalType, addModalAtom, removeModalAtom } from '#/stores/modal';

export const useModal = () => {
    const addModal = useSetAtom(addModalAtom);
    const removeModal = useSetAtom(removeModalAtom);

    const modal = useMemo(
        () => ({
            open: (openedModal: ModalType) => addModal(openedModal),
            close: removeModal,
        }),
        [addModal, removeModal],
    );

    return modal;
};
