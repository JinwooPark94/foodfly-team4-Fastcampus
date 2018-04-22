import { Injectable } from '@angular/core';

import { Toastr } from '../../core/interface/toastr.interface';

@Injectable()
export class ToastrService {

  toastrArr: Toastr[] = [];
  style: string;

  constructor() {}

  getId() {
    return this.toastrArr.length ? Math.max.apply('', this.toastrArr.map(toastr => toastr.id)) + 1 : 1;
  }

  messageAdd(message: string, style: string) {
    // 5개 보다 크면 Add 불가
    if (this.toastrArr.length >= 5) { return ; }

    const newId = this.getId();
    const newtoastr = { id: newId, message, style };
    this.toastrArr = this.toastrArr.concat(newtoastr);

    setTimeout(() => {
      this.messageRemove(newId);
    }, 5000);
  }

  messageRemove(id: number) {
    this.toastrArr = this.toastrArr.filter( toastr => toastr.id !== id );
  }
}
