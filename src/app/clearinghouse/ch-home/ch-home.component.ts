import { Component } from '@angular/core';
import { CHService } from '../../shared/ch.service';

@Component({
  selector: 'app-ch-home',
  templateUrl: './ch-home.component.html',
  styleUrl: './ch-home.component.css'
})
export class ChHomeComponent {
  chData: {}[];

  constructor(private chService: CHService){}

  ngOnInit(){
    this.chData = this.chService.getCHData()
    console.log(this.chData);
  }
}
