import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';

import { getAsync, postAsync } from '#/apis/API';

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_USER_URL = 'https://kapi.kakao.com/v2/user/me';
const DEV_KAKAO_REDIRECT_URL = 'http://localhost:3000/api/oauth/redirect';

const kakaoRestApiKey = process.env.KAKAO_REST_API_KEY;
const kakaoOauthRedirectUri = process.env.KAKAO_OAUTH_REDIRECT_URL;

export class AuthRepository {
    /**
     * 서비스 로그인 처리를 진행하는 함수 getLoginAsync
     */
    static async getLoginAsync({
        id,
        nickname,
        profileImageUrl,
    }: AuthReqParams['login']) {
        const { access_token } = await getAsync<AuthResponse['login']>(
            '/auth/login',
            {
                searchParams: {
                    id,
                    nickname,
                    profileImageUrl,
                },
            },
        );
        return access_token;
    }

    /**
     * 인가 Code 를 통해 카카오로부터 사용자의 Access Token 을 받는 함수 postKakaoOauthAsync
     */
    static async postKakaoOauthAsync(code: string) {
        const { access_token } = await postAsync<AuthResponse['kakaoOauth']>(
            KAKAO_TOKEN_URL,
            null,
            {
                prefixUrl: undefined,
                searchParams: {
                    grant_type: 'authorization_code',
                    client_id: kakaoRestApiKey || '',
                    redirect_uri:
                        kakaoOauthRedirectUri || DEV_KAKAO_REDIRECT_URL,
                    code,
                },
            },
        );

        return access_token;
    }

    /**
     * 카카오로부터 받은 access token 을 기반으로 사용자 정보를 가져오는 함수 postKakaoProfileAsync
     */
    static async getKakaoProfileAsync(accessToken: string) {
        const {
            id,
            kakao_account: { profile },
        } = await getAsync<AuthResponse['kakaoProfile']>(KAKAO_USER_URL, {
            prefixUrl: undefined,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return { id, profile };
    }
}
