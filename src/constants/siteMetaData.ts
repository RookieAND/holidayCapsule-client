import { Metadata } from 'next';

const APP_NAME = 'holidayCapsule';
const APP_DESCRIPTION =
    '연말이 지나기 전에, 소중한 추억을 친구와 공유해보세요!';

export const metadata: Metadata = {
    title: APP_NAME,
    applicationName: APP_DESCRIPTION,
    manifest: '/manifest.json',
    keywords: ['holiday', 'capsule', 'album', 'nostalgia'],
    openGraph: {
        type: 'website',
        url: '',
        title: APP_NAME,
        description: APP_DESCRIPTION,
        siteName: APP_NAME,
        images: [
            {
                url: '',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@site',
        creator: '@creator',
        images: 'https://example.com/og.png',
    },
    icons: [
        { rel: 'icon', url: '/favicon.ico' },
        { rel: 'apple-touch-icon', url: '/icon-192x192.png' },
    ],
};
