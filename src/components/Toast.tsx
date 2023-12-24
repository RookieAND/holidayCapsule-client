import { HTMLAttributes, useCallback, useEffect } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';

import BellSvg from '#/assets/icons/bell.svg';
import AppPortal from '#/components/AppPortal';
import { type ToastType, addToastAtom, removeToastAtom } from '#/stores/toast';

export const ToastProvider = () => {
    const { toastQueue } = useAtomValue(addToastAtom);
    return (
        <AppPortal.Wrapper portalName="toast-portal">
            {toastQueue.slice(0, 1).map(({ category, message, sequence }) => (
                <ToastMessage
                    key={sequence}
                    message={message}
                    category={category}
                    sequence={sequence}
                />
            ))}
        </AppPortal.Wrapper>
    );
};

const ToastVariants = cva(
    `
    flex justify-center items-center mx-auto
    min-w-[320px] max-w-[320px] px-8 py-2 rounded-md
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

    const removeToastOnClose = useCallback(
        () => closeToast(sequence),
        [closeToast, sequence],
    );

    useEffect(() => {
        const timeoutForRemove = setTimeout(removeToastOnClose, 3000);
        () => clearTimeout(timeoutForRemove);
    }, [removeToastOnClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                onClick={removeToastOnClose}
                className="flex flex-col justify-center items-center"
            >
                <BellSvg width={50} height={50} className="translate-y-3.5" />
                <div className={ToastVariants({ theme, className })}>
                    <p className="text-white text-subtitle1">{message}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
