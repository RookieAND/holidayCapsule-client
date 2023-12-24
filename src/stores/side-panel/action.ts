import { atom } from 'jotai';

import { sidePanelAtom } from './store';

export const toggleSidePanelAtom = atom(
    (get) => get(sidePanelAtom),
    (get, set, change?: boolean) => {
        const prevAtom = get(sidePanelAtom);
        set(sidePanelAtom, {
            isOpen: change ?? !prevAtom.isOpen,
        });
    },
);
