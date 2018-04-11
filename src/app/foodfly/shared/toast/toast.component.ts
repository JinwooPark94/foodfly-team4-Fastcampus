import { Component } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'foodfly-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
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
export class ToastComponent {

  constructor(private toastService: ToastService) {}

}
