import type { ReactNode } from 'react';

import { atom } from 'jotai';

export interface SidePanelProvider {
    isOpen: boolean;
}

export const sidePanelAtom = atom<SidePanelProvider>({
    isOpen: false,
});
