import type { MouseEvent } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';

import AppPortal from '#/components/AppPortal';
import Button from '#/components/Button';
import { type ModalType, addModalAtom, removeModalAtom } from '#/stores/modal';

export const ModalProvider = () => {
    const { modal } = useAtomValue(addModalAtom);
    const closeModal = useSetAtom(removeModalAtom);

    const handleClickOutSide = (event: MouseEvent<HTMLDivElement>) => {
        closeModal();
        event.stopPropagation();
    };

    if (!modal) return null;

    return (
        <AppPortal.Wrapper portalName="modal-portal">
            <Modal {...modal} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-creme/25 blur-lg w-full fixed inset-0"
                onClick={handleClickOutSide}
            />
        </AppPortal.Wrapper>
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

    const handleClickCloseButton = () => {
        onClose?.();
        closeModal();
    };

    const handleClickConfirmButton = () => {
        onConfirm?.();
        closeModal();
    };

    return (
        <AnimatePresence>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-1.5 justify-center items-center fixed -translate-x-1/2 left-1/2 top-36 min-w-[320px] z-10"
            >
                <div className="flex flex-col justify-center items-center bg-creme border-2 border-red-500 rounded-md px-4 py-6 w-full">
                    <h2 className="px-4 py-0.5 bg-teal-500 text-white rounded-md mx-auto mb-4 w-[160px] text-center">
                        {title}
                    </h2>
                    {children}
                </div>
                <div className="flex justify-center gap-1.5 w-100 mx-4">
                    <Button
                        className="min-w-[140px]"
                        onClick={handleClickConfirmButton}
                    >
                        {confirmText}
                    </Button>
                    <Button
                        className="min-w-[140px]"
                        onClick={handleClickCloseButton}
                    >
                        {closeText}
                    </Button>
                </div>
            </motion.section>
        </AnimatePresence>
    );
};
