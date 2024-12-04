import { Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dslider',
  templateUrl: './dslider.component.html',
  styleUrl: './dslider.component.css',
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
export class DsliderComponent {
  showSlider(data: any) {
    throw new Error('Method not implemented.');
  }
 
  @Input() selectIns: any;

  isOpen = false;
  type: string = '';
  denials: any = {pr: '', co: '', code: NaN, reason: '', subreason1:'', subreason2:'', desc: '', snddesc:'', noteTool: 'Not Available', audio: '', audio2: ''};
  dtype: string = 'single';


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
    console.log(this.selectIns)
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
  dtypechanged(){
    if(this.denials.subreason1 !== '' && this.denials.subreason2 !== ''){
      return 'double'
    }
    else{
      return 'single'
    }
  }
  codeAdder(){
    if(this.denials.pr !== '' && this.denials.co !== ''){
      return this.denials.pr + '/' + this.denials.co;
    }
    else if(this.denials.pr === '' && this.denials.co === 'CO'){
      return this.denials.co;
    }
    
    else{
      return this.denials.pr;
    }
  }

}
