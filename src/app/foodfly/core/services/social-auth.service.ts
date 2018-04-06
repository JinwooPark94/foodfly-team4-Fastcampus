import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/switchMap';

import {
  SocialAuthConfig,
  FACEBOOK_AUTH_CONFIG,
  GOOGLE_AUTH_CONFIG,
  KAKAO_AUTH_CONFIG
} from './social-auth.config';

declare const FB: any;
declare const gapi: any;
declare const Kakao: any;

interface Credential {
  uid: number;
  accessToken: string;
}

@Injectable()
export class SocialAuthService {

  constructor() {
    this.initProviderConfig(
      FACEBOOK_AUTH_CONFIG,
      GOOGLE_AUTH_CONFIG,
      KAKAO_AUTH_CONFIG
    );
  }

  getSocialCredential(provider: string): Observable<Credential> {
    return Observable.create((observer: Observer<Credential>) => {
      switch (provider) {
        case 'facebook':
          FB.getLoginStatus(response => {
            if (response.status === 'connected') {
              observer.next(this.fetchFacebookCredential(response.authResponse));
            } else {
              FB.login(response => {
                if (response.status === 'connected') {
                  observer.next(this.fetchFacebookCredential(response.authResponse));
                }
              });
            }
            observer.complete();
          });
          break;
        case 'google':
          const auth2 = gapi.auth2.getAuthInstance();
          if (!auth2.isSignedIn.get()) {
            auth2.signIn().then(() => {
              observer.next(this.fetchGoogleCredential(auth2.currentUser.get()));
            });
          } else {
            observer.next(this.fetchGoogleCredential(auth2.currentUser.get()));
          }
          observer.complete();
          break;
        case 'kakao':
          // Kakao.Auth.logout();
          Kakao.Auth.getStatus(res => {
            const that = this;
            if (res.status !== 'connected') {
              Kakao.Auth.login({
                success: function () {
                  Kakao.API.request({
                    url: '/v1/user/me',
                    success: function (user) {
                      observer.next(that.fetchKakaoCredential(user.id, Kakao.Auth.getAccessToken()));
                      observer.complete();
                    },
                    fail: function (error) {
                      console.log(JSON.stringify(error));
                    }
                  });
                },
                fail: function (err) {
                  console.log(JSON.stringify(err));
                }
              });
            } else {
              observer.next(this.fetchKakaoCredential(res.user.id, Kakao.Auth.getAccessToken()));
              observer.complete();
            }
          });
          break;
        }
    });
  }

  private fetchFacebookCredential(authResponse): Credential {
    return {
      uid: authResponse.userID,
      accessToken: authResponse.accessToken
    };
  }

  private fetchGoogleCredential(currentUser): Credential {
    return {
      uid: currentUser.getBasicProfile().getId(),
      accessToken: currentUser.getAuthResponse().access_token
    };
  }
  private fetchKakaoCredential(uid: number, accessToken: string): Credential {
    return { uid, accessToken };
  }

  private initProviderConfig(...configs: SocialAuthConfig[]) {
    configs.forEach(this.loadScript);
  }

  private loadScript(config: SocialAuthConfig) {
    if (document.getElementById(config.provider)) { return; }

    const script = document.createElement('script');
    script.id = config.provider;
    script.src = config.sdk;
    script.async = true;
    script.onload = () => { config.init(); };
    document.head.appendChild(script);
  }
}
