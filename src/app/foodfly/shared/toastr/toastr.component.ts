import { Component } from '@angular/core';
import { ToastrService } from '../../core/services/toastr.service';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'foodfly-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css'],
  animations: [
    trigger('rightInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ right: `-300px` }),
        animate(500, style({ right: '0px' }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ right: `-300px` }))
      ])
    ])
  ]
})
export class ToastrComponent {

  constructor(private toastrService: ToastrService) {}

}
