import { Pipe, PipeTransform } from '@angular/core';
import { Toastr } from '../interface/toastr.interface';

@Pipe({
  name: 'toastrPipe'
})
export class ToastrPipe implements PipeTransform {

  transform(toastArr: Toastr[]): Toastr[] {
    return toastArr.sort((a, b) => a.id - b.id);
  }

}
