import { createContext, useContext, useState } from 'react';
import type { HTMLAttributes } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';

interface PortalProviderProps extends HTMLAttributes<HTMLDivElement> {
    portalName?: string;
}

interface PortalWrapperProps extends HTMLAttributes<HTMLDivElement> {
    portalName: string;
}

const PortalContext = createContext<Map<string, HTMLDivElement | null>>(
    new Map(),
);

/**
 * React Portal 을 등록하는 DivELement 목록을 주입하는 PortalProvider
 */
const PortalProvider = ({
    children,
    className,
    portalName = 'app-portal',
}: PortalProviderProps) => {
    const [portalContainer, setPortalContainer] =
        useState<HTMLDivElement | null>(null);
    const portalList = useContext(PortalContext);

    if (portalContainer) {
        portalList.set(portalName, portalContainer);
    }

    return (
        <PortalContext.Provider value={portalList}>
            <div
                className={clsx('absolute top-0 left-0 w-full', className)}
                id={portalName}
                ref={(element) => {
                    if (element && !portalContainer)
                        setPortalContainer(element);
                }}
            >
                {children}
            </div>
        </PortalContext.Provider>
    );
};

/**
 * 특정 PortalName 을 기반으로 React Portal 을 생성하는 함수 PortalWrapper
 */
const PortalWrapper = ({ children, portalName }: PortalWrapperProps) => {
    const portalList = useContext(PortalContext);
    const portalContainer = portalList.get(portalName);

    if (!portalContainer) {
        throw new Error(`${portalName} 을 가진 PortalProvider 를 찾을 수 없습니다.`);
    }

    return createPortal(children, portalContainer);
};

const AppPortal = {
    Provider: PortalProvider,
    Wrapper: PortalWrapper,
};

export default AppPortal;