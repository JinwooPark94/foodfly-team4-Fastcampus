declare const FB: any;
declare const gapi: any;
declare const Kakao: any;

export interface SocialAuthConfig {
  provider: string;
  appId: string;
  sdk: string;
  init: Function;
}

import { environment } from '../../../../environments/environment';

export const FACEBOOK_AUTH_CONFIG: SocialAuthConfig = {
  // https://developers.facebook.com/apps/153931948571383/dashboard/
  provider: 'facebook',
  appId: environment.facebookAppId,
  sdk: '//connect.facebook.net/en_US/sdk.js',
  init() {
    FB.init({
      appId: this.appId,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.8'
    });
    FB.AppEvents.logPageView();
  }
};

export const GOOGLE_AUTH_CONFIG: SocialAuthConfig = {
  // https://console.developers.google.com/apis/dashboard?project=angular-auth-exam
  provider: 'google',
  appId: environment.googleAppId,
  sdk: '//apis.google.com/js/platform.js',
  init() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.appId,
        scope: 'profile email'
      });
    });
  }
};

export const KAKAO_AUTH_CONFIG: SocialAuthConfig = {
  // https://developers.kakao.com/apps/167720/created
  provider: 'kakao',
  appId: environment.kakaoAppId, /* Javascript키 */
  sdk: '//developers.kakao.com/sdk/js/kakao.min.js',
  init() {
    Kakao.init(this.appId);
  }
};
