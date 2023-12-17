type AuthReqParams = {
  login: {
    id: string;
    nickname: string;
    profileImageUrl: string; 
  };
};

type AuthResponse = {
  login: { access_token: string };
  kakaoOauth: { access_token: string; refresh_token: string };
  kakaoProfile: {
    id: string;
    kakao_account: {
      profile: {
        nickname: string;
        thumbnail_image_url: string;
        profile_image_url: string;
        is_default_image: boolean;
      };
    };
  };
};
