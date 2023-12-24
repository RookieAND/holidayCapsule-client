import { useContext } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';

import { PortalContext } from '#/components/AppPortal';
import Button from '#/components/Button';
import { addModalAtom, removeModalAtom } from '#/stores/modal/action';
import type { ModalType } from '#/stores/modal/store';

export const ModalProvider = () => {
    const { modal } = useAtomValue(addModalAtom);
    const closeModal = useSetAtom(removeModalAtom);
    const portalList = useContext(PortalContext);

    const isOpen = !!modal;

    const removeModalOnClose = (open: boolean) => !open && closeModal();

    return (
        <Dialog.Root open={isOpen} onOpenChange={removeModalOnClose}>
            <Dialog.Portal container={portalList.get('modal-portal')}>
                {modal && <Modal {...modal} />}
                <Dialog.Overlay className="bg-creme/50 blur-lg w-full fixed inset-0" />
            </Dialog.Portal>
        </Dialog.Root>
    );
};

interface ModalProps extends ModalType {
    confirmText: string;
    onConfirm?: () => void;
    closeText: string;
    onClose?: () => void;
}

export const Modal = ({
    title,
    children,
    confirmText,
    onConfirm,
    closeText,
    onClose,
}: ModalProps) => {
    const closeModal = useSetAtom(removeModalAtom);

    const handleClickConfirm = () => {
        onConfirm?.();
        closeModal();
    };

    const handleClickClose = () => {
        onClose?.();
        closeModal();
    };

    return (
        <Dialog.Content onInteractOutside={closeModal} asChild>
            <div className="flex flex-col gap-1.5 justify-center items-center fixed -translate-x-1/2 left-1/2 top-36 min-w-[320px] z-10">
                <div className="flex flex-col justify-center items-center bg-creme border-2 border-red-500 rounded-md px-4 py-6 w-full">
                    <Dialog.Title className="px-4 py-0.5 bg-teal-500 text-white text-h2 rounded-md mx-auto mb-4 w-[160px] text-center">
                        {title}
                    </Dialog.Title>
                    {children}
                </div>
                <div className="flex justify-center gap-1.5 w-100 mx-4">
                    <Dialog.Close>
                        <Button className="min-w-[140px]" onClick={onConfirm}>
                            {confirmText}
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button className="min-w-[140px]" onClick={onClose}>
                            {closeText}
                        </Button>
                    </Dialog.Close>
                </div>
            </div>
        </Dialog.Content>
    );
};
