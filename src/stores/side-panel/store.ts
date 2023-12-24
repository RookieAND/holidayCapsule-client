import { atom } from 'jotai';
import type { ReactNode } from 'react';

export interface SidePanelProvider {
    isOpen: boolean;
}

export const sidePanelAtom = atom<SidePanelProvider>({
    isOpen: false,
})