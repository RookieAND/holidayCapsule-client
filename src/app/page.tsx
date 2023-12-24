'use client';

import { useModal } from '#/hooks/useModal';
import { useToast } from '#/hooks/useToast';
import { useSidePanel } from '#/hooks/useSidePanel';

export default function Home() {
    const modal = useModal();
    const toast = useToast();
    const sidePanel = useSidePanel();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button
                onClick={() =>
                    modal.open({
                        title: 'test',
                        children: <p>test</p>,
                        confirmText: '수락',
                        closeText: '닫기',
                    })
                }
            >
                test Modal
            </button>
            <button
                onClick={() =>
                    toast.success('성공!')
                }
            >
                test Toast
            </button>
            <button onClick={() => sidePanel.toggle()}>
                test SidePanel
            </button>
        </main>
    );
}
