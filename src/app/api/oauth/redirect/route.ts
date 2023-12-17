import { NextResponse } from 'next/server';

import { getAsync, postAsync } from '#/apis/API';

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_USER_URL = 'https://kapi.kakao.com/v2/user/me';
const DEV_KAKAO_REDIRECT_URL = 'http://localhost:3000/api/oauth/redirect';

type KakaoRestType = { access_token: string; refresh_token: string };
type KakaoUserMeType = {
  kakao_account: {
    profile: {
      nickname: string;
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
    };
  };
};

export async function GET(request: Request) {
  const kakaoRestApiKey = process.env.KAKAO_REST_API_KEY;
  const kakaoOauthRedirectUri = process.env.KAKAO_OAUTH_REDIRECT_URL;

  if (!kakaoRestApiKey) {
    return NextResponse.json(null, {
      status: 500,
      statusText: 'Kakao Rest Api key 가 없습니다.',
    });
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(null, {
      status: 400,
      statusText: '인증에 필요한 code 가 Query 에 없습니다.',
    });
  }

  try {
    const { access_token } = await postAsync<KakaoRestType>(
      KAKAO_TOKEN_URL,
      null,
      {
        prefixUrl: '',
        searchParams: {
          grant_type: 'authorization_code',
          client_id: kakaoRestApiKey,
          redirect_uri: kakaoOauthRedirectUri || DEV_KAKAO_REDIRECT_URL,
          code,
        },
      },
    );

    const {
      kakao_account: { profile },
    } = await getAsync<KakaoUserMeType>(KAKAO_USER_URL, {
      prefixUrl: '',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log(profile);

    // const result = await postAsync<boolean>('/user/login', {
    //   profile_image: profile.profile_image_url,
    //   nickname: profile.nickname,
    // });

    return NextResponse.json(null, {
      status: 200,
      statusText: '로그인에 성공.',
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: 'kakao 로그인을 처리하는 과정에서 문제가 발생했습니다.',
    });
  }
}
