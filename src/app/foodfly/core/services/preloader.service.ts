import { Injectable } from '@angular/core';

@Injectable()
export class PreloaderService {
  isShow = false;

  show() {
    console.log('[SHOW]');
    this.isShow = true;
  }

  hide() {
    console.log('[HIDE]');
    this.isShow = false;
  }
}
