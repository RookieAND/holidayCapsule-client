import { atom } from 'jotai';

export type ToastCategoryType = 'alert' | 'notict' | 'success';

export interface ToastType {
    category: ToastCategoryType;
    message: string;
    sequence: number;
}

export interface ToastProviderType {
    /** 렌더링 해야 할 토스트 목록 */
    toastQueue: ToastType[];
    /** 현재 렌더링 중인 Sequence */
    sequence: number;
}

export const toastAtom = atom<ToastProviderType>({
    toastQueue: [],
    sequence: 0,
});
