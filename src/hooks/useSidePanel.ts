import { useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { toggleSidePanelAtom } from '#/stores/side-panel';

export const useSidePanel = () => {
    const toggleSidePanel = useSetAtom(toggleSidePanelAtom);

    const sidePanel = useMemo(
        () => ({
            open: () => toggleSidePanel(true),
            close: () => toggleSidePanel(false),
            toggle: () => toggleSidePanel(),
        }),
        [toggleSidePanel],
    );

    return sidePanel;
};
