import { useCallback, useState } from 'react';

import { motion } from 'framer-motion';

import { useInterval } from '#/hooks/useInterval';

const TIP_LIST = [
    '한 명 당 캡슐은 총 3개까지 소장할 수 있어요.',
    '하나의 캡슐에 최대 4명의 친구를 초대할 수 있어요.',
    '하나의 캡슐에 최대 12장의 사진을 넣을 수 있어요.',
];

const TipSection = () => {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    const updateTipIndex = useCallback(
        () =>
            setCurrentTipIndex((prev) =>
                prev === TIP_LIST.length - 1 ? 0 : prev + 1,
            ),
        [],
    );

    useInterval({ callback: updateTipIndex, delay: 3000 });

    return (
        <section className="flex flex-col gap-y-1 items-center justify-center">
            <h5 className="text-white">♦️ CAPSULE TIP! ♦️</h5>
                <motion.p
                    key={currentTipIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-body1 rounded-md px-4 py-1 bg-teal-500 text-white shadow-md"
                >
                    {TIP_LIST[currentTipIndex]}
                </motion.p>
        </section>
    );
};

export default TipSection;
