'use client';

import Image from 'next/image';

import { useModal } from '#/hooks/useModal';

export default function Home() {
    const modal = useModal();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button
                onClick={() =>
                    modal.open({ title: 'test', children: <p>test</p> })
                }
            >
                test Modal
            </button>
        </main>
    );
}
