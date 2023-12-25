'use client';

import type { PropsWithChildren } from 'react';
import Snowfall from 'react-snowfall'

import AppPortal from '#/components/AppPortal';
import { ModalProvider } from '#/components/Modal';
import { SidePanel } from '#/components/SidePanel';
import { ToastProvider } from '#/components/Toast';

export default function Template({ children }: PropsWithChildren) {
    return (
        <>
            <AppPortal.Provider
                portalName="modal-portal"
                className="w-full top-0 left-0 "
            >
                <ModalProvider />
            </AppPortal.Provider>
            <AppPortal.Provider
                portalName="toast-portal"
                className="w-full bottom-32"
            >
                <ToastProvider />
            </AppPortal.Provider>
            <main className="relative m-auto min-h-screen min-w-[360px] max-w-[480px] bg-gray-500">
                <AppPortal.Provider
                    portalName="side-panel-portal"
                    className="flex flex-row-reverse w-full"
                >
                    <SidePanel />
                </AppPortal.Provider>
                <Snowfall color="#F9F9E8" snowflakeCount={75} />
                {children}
            </main>
        </>
    );
}
