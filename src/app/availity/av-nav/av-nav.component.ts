import { Component, ElementRef, EventEmitter, Output, viewChild } from '@angular/core';
// import { availityService } from '../../shared/availity.service';
import { InsuranceService } from '../../shared/insurance.service';

@Component({
  selector: 'app-av-nav',
  templateUrl: './av-nav.component.html',
  styleUrl: './av-nav.component.css'
})
export class AvNavComponent {
  selectedFilter: string = '';
  @Output() sendSelectedFilter = new EventEmitter<string>();
  stateList: {name:string, abbv: string}[];

  constructor(private insuranceService: InsuranceService){}

  ngOnInit(){
    // this.availityService.selectedState = this.selectedFilter;
    this.stateList = this.insuranceService.stateList;
  }

  onSelect(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    this.selectedFilter = selectElement.value;
    // this.availityService.selectedState = this.selectedFilter;
    // this.availityService.changestate(this.selectedFilter);

    this.insuranceService.changeSelectState.next(selectElement.value);
    
  }

  
}
