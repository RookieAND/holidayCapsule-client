import { useMemo, useState } from 'react';

/**
 * Boolean State 를 편리하게 핸들링하기 위한 Hook useDisclosure
 */
export const useDisclosure = () => {
    const [isOpen, setIsOpen] = useState(false);

    return useMemo(
        () => ({
            isOpen,
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
            toggle: () => setIsOpen((prevState) => !prevState),
        }),
        [isOpen],
    );
};
