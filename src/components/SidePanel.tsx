import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';

import HolidayLogoSvg from '#/assets/icons/holidayLogo.svg';
import LogoSvg from '#/assets/icons/logo.svg';
import TeamLogoSvg from '#/assets/icons/teamLogo.svg';
import AppPortal from '#/components/AppPortal';
import { sidePanelAtom } from '#/stores/side-panel';

import { toggleSidePanelAtom } from '../stores/side-panel/action';

const NAVIGATOR_OPTION = [
    {
        path: '/share',
        label: '캡슐 링크 공유하기',
    },
    {
        path: '/invitation',
        label: '친구 초대 확인하기',
    },
    {
        path: '/book',
        label: '완료하고 출판하기',
    },
] as const;

export const SidePanel = () => {
    const { isOpen } = useAtomValue(sidePanelAtom);
    const toggleSidePanel = useSetAtom(toggleSidePanelAtom);

    return (
        <AppPortal.Wrapper portalName="side-panel-portal">
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 300 }}
                            transition={{ ease: 'easeOut', duration: 0.25 }}
                            className="flex"
                        >
                            <aside className="min-w-[240px] w-[300px] max-w-[360px] h-screen bg-teal-500 py-6 z-1">
                                <div className="p-6 flex flex-col gap-0.5 items-start">
                                    <h4 className="text-white">
                                        내 캡슐 이름은
                                    </h4>
                                    <h4 className="px-2 py-0.5 bg-white rounded-md text-teal-500">
                                        아몰랑 캡슐입니다
                                    </h4>
                                </div>
                                <div className="flex flex-col gap-2 border-y-2 border-creme w-full py-6">
                                    {NAVIGATOR_OPTION.map(({ path, label }) => (
                                        <Link
                                            href={path}
                                            className="flex gap-2 py-0.5 ml-4"
                                            key={path}
                                        >
                                            <LogoSvg width={24} height={24} />
                                            <p className="border border-creme px-3 py-0.5 rounded-lg text-white hover:bg-creme hover:text-teal-500">
                                                {label}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                                <div className="flex gap-1">
                                    <HolidayLogoSvg width={128} height={128} />
                                    <TeamLogoSvg width={128} height={128} />
                                </div>
                            </aside>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-black/25 blur-lg w-full h-screen"
                            onClick={() => toggleSidePanel(false)}
                        />
                    </>
                )}
            </AnimatePresence>
        </AppPortal.Wrapper>
    );
};
