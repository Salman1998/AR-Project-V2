import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-back',
  templateUrl: './add-back.component.html',
  styleUrl: './add-back.component.css'
})
export class AddBackComponent {
constructor(private location: Location){}

goBack(){
  this.location.back();
  console.log('back')
}
add(){
  
}

}
