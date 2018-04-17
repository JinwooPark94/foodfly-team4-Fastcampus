import { Component, OnInit } from '@angular/core';
import { PreloaderService } from '../../core/services/preloader.service';

@Component({
  selector: 'foodfly-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent {

  constructor(private preloader: PreloaderService) {}
}
