import { HTMLAttributes, useContext, useEffect } from 'react';

import * as Toast from '@radix-ui/react-toast';
import { type VariantProps, cva } from 'class-variance-authority';
import { useAtomValue, useSetAtom } from 'jotai';

import AppPortal, { PortalContext } from '#/components/AppPortal';
import { addToastAtom, removeToastAtom } from '#/stores/toast/action';
import type { ToastCategoryType, ToastType } from '#/stores/toast/store';

export const ToastProvider = () => {
    const { toastQueue } = useAtomValue(addToastAtom);
    const closeModal = useSetAtom(removeToastAtom);
    const portalList = useContext(PortalContext);

    console.log(toastQueue);

    return (
        <Toast.Provider swipeDirection="up">
            {toastQueue.slice(0, 1).map(({ category, message, sequence }) => (
                <ToastMessage
                    key={sequence}
                    message={message}
                    category={category}
                    sequence={sequence}
                />
            ))}
            <Toast.Viewport className="mx-auto">
                <AppPortal.Wrapper portalName="toast-portal" />
            </Toast.Viewport>
        </Toast.Provider>
    );
};

const ToastVariants = cva(
    `
    flex justify-center mb-2 mx-auto
    min-w-[320px] max-w-[320px] px-8 py-1.5 flex items-center rounded-sm
    `,
    {
        variants: {
            theme: {
                red: 'bg-red-500',
                teal: 'bg-teal-500',
            },
        },
        defaultVariants: {
            theme: 'red',
        },
    },
);

interface ToastProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof ToastVariants>,
        ToastType {}

export const ToastMessage = ({
    category,
    theme,
    message,
    sequence,
    className,
}: ToastProps) => {
    const closeToast = useSetAtom(removeToastAtom);
    const removeToastOnClose = () => closeToast(sequence);

    useEffect(() => {
        const timeoutForRemove = setTimeout(removeToastOnClose, 3000);
        () => clearTimeout(timeoutForRemove);
    });

    return (
        <Toast.Root
            className={ToastVariants({ theme, className })}
            onSwipeEnd={removeToastOnClose}
        >
            <Toast.Title className="text-white text-subtitle1">
                {message}
            </Toast.Title>
        </Toast.Root>
    );
};
