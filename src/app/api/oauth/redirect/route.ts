import { NextResponse } from 'next/server';

import { AuthRepository } from '#/apis/auth';

export async function GET(request: Request) {
    const kakaoRestApiKey = process.env.KAKAO_REST_API_KEY;

    if (!kakaoRestApiKey) {
        return NextResponse.json(null, {
            status: 500,
            statusText: 'Kakao Rest Api key 가 없습니다.',
        });
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json(
            {
                message: '인증에 필요한 code 가 Query 에 없습니다.',
            },
            { status: 400 },
        );
    }

    try {
        const kakaoAccessToken = await AuthRepository.postKakaoOauthAsync(code);
        const { id, profile } =
            await AuthRepository.getKakaoProfileAsync(kakaoAccessToken);

        const accessToken = await AuthRepository.postLoginAsync({
            id,
            nickname: profile.nickname,
            profileImageUrl: profile.profile_image_url,
        });

        if (!accessToken)
            throw new Error('서버로부터 JWT 토큰을 인가받지 못했습니다.');

        return NextResponse.json(
            { accessToken },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message:
                    'kakao 로그인을 처리하는 과정에서 문제가 발생했습니다.',
            },
            {
                status: 500,
            },
        );
    }
}
