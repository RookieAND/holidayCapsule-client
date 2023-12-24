import { useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { addModalAtom, removeModalAtom } from '#/stores/modal/action';
import { ModalType } from '#/stores/modal/store';
import { addToastAtom, removeToastAtom } from '#/stores/toast/action';
import { ToastType } from '#/stores/toast/store';

export const useToast = () => {
    const addToast = useSetAtom(addToastAtom);
    const toast = useMemo(
        () => ({
            success: (message: string) =>
                addToast({ message, category: 'success' }),
            alert: (message: string) =>
                addToast({ message, category: 'alert' }),
        }),
        [addToast],
    );

    return toast;
};
