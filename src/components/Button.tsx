import { ButtonHTMLAttributes } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
    `
    flex gap-1 justify-center items-center word-break:keep-all
    disabled:pointer-events-none disabled:opacity-30 transition-colors
    text-body1 border-2 border-red-500 bg-creme py-1.5 px-8 text-red-500
    `,
    {
        variants: {
            rounded: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
            },
            width: {
                fit: 'w-fit',
                full: 'w-full',
            },
        },
        defaultVariants: {
            rounded: 'lg',
            width: 'fit',
        },
    },
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = ({ className, rounded, width, ...props }: ButtonProps) => (
    <button
        className={buttonVariants({ rounded, width, className })}
        {...props}
    />
);

export default Button;
