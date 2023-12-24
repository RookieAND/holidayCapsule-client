import { atom } from 'jotai';
import type { ReactNode } from 'react';

export interface ModalType {
    title: string;
    children: ReactNode;
    confirmText: string;
    onConfirm?: () => void;
    closeText: string;
    onClose?: () => void;
}

export interface ModalProviderType {
    /** 렌더링 해야 할 모달 */
    modal: ModalType | undefined,
}

export const modalAtom = atom<ModalProviderType>({
    modal: undefined,
})