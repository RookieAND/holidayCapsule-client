'use client';

import type { PropsWithChildren } from 'react';

import AppPortal from '#/components/AppPortal';
import { ModalProvider } from '#/components/Modal';

export default function Template({ children }: PropsWithChildren) {
    return (
        <>
            <AppPortal.Provider portalName="modal-portal">
                <ModalProvider />
            </AppPortal.Provider>
            <main className='relative m-auto min-h-screen min-w-[360px] max-w-[480px] bg-white'>
                {children}
            </main>
        </>
    );
}
