import { Pipe, PipeTransform } from '@angular/core';
import { Toast } from '../interface/toast.interface';

@Pipe({
  name: 'toastPipe'
})
export class ToastPipe implements PipeTransform {

  transform(toastArr: Toast[]): Toast[] {
    return toastArr.sort((a, b) => a.id - b.id);
  }

}
