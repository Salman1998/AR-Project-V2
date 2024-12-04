import { Component, Input} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0%)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class SliderComponent {
  showSlider(data: any) {
    throw new Error('Method not implemented.');
  }
 
  @Input() selectIns: any;

  isOpen = false;
  type: string = '';
  denials: any;
  dType: string = '';
  
  openSlider(type: string) {

    this.type = type;
    this.isOpen = true;
        
  }

  openSliders(type: string, selectData: any) {
    this.type = type;
    this.isOpen = true;
    this.denials = selectData;
  }

  closeSlider() {
    this.isOpen = false;
  }

  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  enableScroll() {
    document.body.style.overflow = 'auto';
  }

  showdata(){
    console.log(this.selectIns);
  }
}
  