import { atom } from 'jotai';
import type { ReactNode } from 'react';

export interface ModalType {
    title: string;
    children: ReactNode;
}

export interface ModalProviderType {
    /** 렌더링 해야 할 모달 Queue */
    modalQueue: ModalType[],
    /** 모달 Queue 에 전역으로 공유할 데이터 */
    shared: Map<string, unknown>
}

export const modalAtom = atom<ModalProviderType>({
    modalQueue: [],
    shared: new Map(),
})