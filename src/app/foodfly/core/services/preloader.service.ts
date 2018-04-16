import { Injectable } from '@angular/core';

@Injectable()
export class PreloaderService {

  constructor() { }

  isShow = false;

  show() {
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
  }

}
