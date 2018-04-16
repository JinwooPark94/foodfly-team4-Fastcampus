import { Component, OnInit } from '@angular/core';
import { PreloaderService } from '../../core/services/preloader.service';

@Component({
  selector: 'foodfly-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css'],
  providers: [PreloaderService]
})
export class PreloaderComponent implements OnInit {

  constructor(public preloader: PreloaderService) { }

  ngOnInit() {
  }

}
