import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';

import AppPortal from '#/components/AppPortal';
import { sidePanelAtom } from '#/stores/side-panel';

import { toggleSidePanelAtom } from '../stores/side-panel/action';

export const SidePanel = () => {
    const { isOpen } = useAtomValue(sidePanelAtom);
    const toggleSidePanel = useSetAtom(toggleSidePanelAtom);

    return (
        <AppPortal.Wrapper portalName="side-panel-portal">
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.aside
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 300 }}
                            transition={{ ease: 'easeOut', duration: 0.25 }}
                            className="flex "
                        >
                            <div className="min-w-[240px] max-w-[360px] h-screen bg-teal-500 py-12 z-1">
                                <div className="px-8 flex flex-col gap-0,5 items-start">
                                    <h4 className="text-white">
                                        내 캡슐 이름은
                                    </h4>
                                    <h4 className="px-2 py-0.5 bg-white rounded-md text-teal-500">
                                        아몰랑 캡슐입니다
                                    </h4>
                                </div>
                            </div>
                        </motion.aside>
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
