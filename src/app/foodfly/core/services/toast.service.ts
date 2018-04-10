import { Injectable } from '@angular/core';

import { Toast } from '../../core/interface/toast.interface';

@Injectable()
export class ToastService {

  toastArr: Toast[] = [];
  style: string;

  constructor() {
  }

  getId() {
    return this.toastArr.length ? Math.max.apply('', this.toastArr.map(toast => toast.id)) + 1 : 1;
  }

  messageAdd(message: string, style: string) {
    // 5개 보다 크면 Add 불가
    if (this.toastArr.length >= 5) { return ; }

    const newId = this.getId();
    const newToast = { id: newId, message, style };
    this.toastArr = this.toastArr.concat(newToast);

    setTimeout(() => {
      this.messageRemove(newId);
    }, 5000);
  }

  messageRemove(id: number) {
    this.toastArr = this.toastArr.filter( toast => toast.id !== id );
  }
}
