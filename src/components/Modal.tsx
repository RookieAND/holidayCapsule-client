import { useContext } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { useAtomValue, useSetAtom } from 'jotai';

import AppPortal, { PortalContext } from '#/components/AppPortal';
import { addModalAtom, removeModalAtom } from '#/stores/modal/action';
import type { ModalType } from '#/stores/modal/store';

export const ModalProvider = () => {
    const { modal } = useAtomValue(addModalAtom);
    const portalList = useContext(PortalContext);

    const isOpen = !!modal;

    return (
        <Dialog.Root open={isOpen} modal>
            <Dialog.Portal container={portalList.get('modal-portal')}>
                {modal && (
                    <Modal title={modal.title}>
                        {modal.children}
                    </Modal>
                )}
                <Dialog.Overlay className="bg-creme/50 blur-lg w-full fixed inset-0" />
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export const Modal = ({ title, children }: ModalType) => {
    const closeModal = useSetAtom(removeModalAtom);
    return (
        <Dialog.Content onInteractOutside={closeModal} asChild>
            <div className="flex flex-col justify-center items-center fixed -translate-x-1/2 left-1/2 top-36 bg-white w-[320px] px-4 py-6 z-10">
                <Dialog.Title>{title}</Dialog.Title>
                {children}
            </div>
        </Dialog.Content>
    );
};
