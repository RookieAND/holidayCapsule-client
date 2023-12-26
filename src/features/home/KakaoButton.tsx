import { type ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

import KakaoSvg from '#/assets/icons/kakao.svg';

const KakaoButton = ({
    className,
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={clsx(
            'flex gap-x-2 items-center px-6 py-3 rounded-lg text-subtitle1 bg-[#FEE500]',
            className
        )}
    >
        <KakaoSvg width={24} height={24} />
        카카오 로그인
    </button>
);

export default KakaoButton;
