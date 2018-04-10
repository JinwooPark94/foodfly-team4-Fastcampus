import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/switchMap';

import {
  SocialLoginConfig,
  FACEBOOK_AUTH_CONFIG
} from './social-login.config';

declare const FB: any;

interface Credential {
  // uid: number;
  access_token: string;
}

@Injectable()
export class SocialLoginService {

  constructor() {
    this.initProviderConfig(
      FACEBOOK_AUTH_CONFIG
    );
  }

  getSocialCredential(provider: string): Observable<Credential> {
    return Observable.create((observer: Observer<Credential>) => {
      if(provider === 'facebook'){
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
      }
    });
  }

  private fetchFacebookCredential(authResponse): Credential {
    return {
      // uid: authResponse.userID,
      access_token: authResponse.accessToken
    };
  }

  private initProviderConfig(...configs: SocialLoginConfig[]) {
    configs.forEach(this.loadScript);
  }

  private loadScript(config: SocialLoginConfig) {
    if (document.getElementById(config.provider)) { return; }

    const script = document.createElement('script');
    script.id = config.provider;
    script.src = config.sdk;
    script.async = true;
    script.onload = () => { config.init(); };
    document.head.appendChild(script);
  }
}
