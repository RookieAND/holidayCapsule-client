'use client';

import { motion } from 'framer-motion';

import HolidayStarLogoSvg from '#/assets/icons/holidayStarLogo.svg';
import EmptyCard from '#/features/home/EmptyCard';
import KakaoButton from '#/features/home/KakaoButton';
import TipSection from '#/features/home/TipSection';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-red-500 py-24">
            <HolidayStarLogoSvg className="text-creme" width={280} />
            <div className="w-full overflow-hidden">
                <motion.section
                    initial={{ x: -160 }}
                    className="w-fit flex gap-x-4 mt-10 mb-4"
                >
                    <EmptyCard />
                    <EmptyCard />
                    <EmptyCard />
                </motion.section>
            </div>
            <div className="w-64 bg-creme px-4 py-2 shadow-md shadow-red-700 before:content-[''] before:inline before:border-t-creme before:border-l-transparent before:border-t-4 before:border-l-4 mb-auto">
                <h3 className="text-center text-red-600">HAPPY HOLIDAY!</h3>
            </div>
            {/* <KakaoButton /> */}
            <TipSection/>
        </main>
    );
}
