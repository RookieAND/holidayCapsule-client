import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

const KAKAO_OAUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
const DEV_KAKAO_REDIRECT_URL = 'http://localhost:3000/api/oauth/redirect';

export async function GET() {
    const kakaoRestApiKey = process.env.KAKAO_REST_API_KEY;
    const kakaoOauthRedirectUri = process.env.KAKAO_OAUTH_REDIRECT_URL;

    if (!kakaoRestApiKey) {
        return NextResponse.json(null, {
            status: 500,
            statusText: 'Kakao Rest Api key 가 없습니다.',
        });
    }

    const kakaoOauthUrl = new URL(KAKAO_OAUTH_URL);
    kakaoOauthUrl.searchParams.set('client_id', kakaoRestApiKey);
    kakaoOauthUrl.searchParams.set('response_type', 'code');
    kakaoOauthUrl.searchParams.set(
        'redirect_uri',
        kakaoOauthRedirectUri || DEV_KAKAO_REDIRECT_URL,
    );

    return redirect(kakaoOauthUrl.toString());
}
