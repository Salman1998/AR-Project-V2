import { Component } from '@angular/core';
import { DenialService } from '../shared/denials.service';

@Component({
  selector: 'app-denials',
  templateUrl: './denials.component.html',
  styleUrl: './denials.component.css'
})
export class DenialsComponent {
  denials: any = []
  type: string = 'denials'
  constructor(private denialService: DenialService){}

  ngOnInit(){
    this.denials = this.denialService.getDenialsData()
  }

  denialcode(i: number){
    if(this.denials[i].pr !== '' && this.denials[i].co !== '' ){
      return this.denials[i].pr + '/' + this.denials[i].co;
    }
    else if(this.denials[i].pr !== '' ){
      return this.denials[i].pr;
    }
    else{
      return this.denials[i].co; 
    }
  }
}
