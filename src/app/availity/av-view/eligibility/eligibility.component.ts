import { Component, EventEmitter, output, Renderer2 } from '@angular/core';
import { InsuranceModel } from '../../../shared/insurance.model';
import { async, Subscription } from 'rxjs';
import { InsuranceService } from '../../../shared/insurance.service';
import { AdminService } from '../../../admin/admin.service'; 



@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrl: './eligibility.component.css'
})
export class EligibilityComponent {

  insuranceData: InsuranceModel[] = [];
  filteredInsuranceData: InsuranceModel[] = [];
  availableServices: string[] = [];
  selectedService: string = '';
  searchText: string = '';
  selectedInsData;
  subscription: Subscription;
  subscription1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  type = 'claims';
  isEdit: boolean = false;
  editKey: string;
  editValue: any;
  isAdded: boolean = false;
  isLoading: boolean = true
  isAdmin: boolean = false;
  adminSub: Subscription;
  constructor(private insuranceService: InsuranceService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminSub = this.adminService.isAdmin.subscribe(data => {
      this.isAdmin = data
    })
    this.sub2 = this.insuranceService.isLoading.subscribe(isLoading => this.isLoading = isLoading)

    this.insuranceService.fatchInsurance();

    this.sub3 = this.insuranceService.changeInsurance.subscribe(data => {
      this.insuranceData = data;
      this.filteredInsuranceData = data;
    })


    this.subscription = this.insuranceService.getInsuranceData().subscribe((data) => {
      this.insuranceData = data;
      this.filteredInsuranceData = data;
      this.extractAvailableServices();
    });

    this.subscription1 = this.insuranceService.changeSelectState.subscribe(state => {
      this.selectedService = state;
      this.filterInsurance();
      
    })
    

    this.sub4 = this.insuranceService.editData?.subscribe(data => {
      this.editValue = data;
    })
  }

  extractAvailableServices(): void {
    const servicesSet = new Set<string>();
    this.insuranceData.forEach((insurance) => {
      insurance.sList.forEach((service) => {
        servicesSet.add(service.sname);
      });
    });
    this.availableServices = Array.from(servicesSet);
  }

  filterInsurance(): void {

      this.filteredInsuranceData = this.insuranceData.filter((insurance) => {
        const matchesService =
          !this.selectedService ||
          insurance.sList.some((service) => service.sname === this.selectedService);
        const matchesName = !this.searchText || insurance.iname.toLowerCase().includes(this.searchText.toLowerCase());
        return matchesService && matchesName;
      });


  
  }

  onEdit(key){
    if(this.isAdmin){
      this.insuranceService.getEditData(key);
      this.editKey = key
      this.isEdit = true
      return
    }
    alert('You are not allowed to edit this data! Please contact the admin.');    
  }

  onClearSearch(){
    this.searchText = '';
  }

  onClose(): void {
    this.editValue = {};
    this.isEdit = false;
    this.isAdded = false;
  }

  onSubmitEdit(editData){
    this.insuranceService.submitEdit(editData, this.editKey);
    this.isEdit = false;
  }

  onAddInsurance(){
    this.isAdded = true;
  }

  onSubmitAdded(addData){
    this.insuranceService.submitAdded(addData);
    this.isAdded = false
  }

  onDeleted(deleteKey){
    if(this.isAdmin){
      this.insuranceService.deleteInsuranceData(deleteKey);
      return
    }

    alert('You are not allowed to edit this data! Please contact the admin.');

  }

  show(data: any){
    this.selectedInsData = data;
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
      this.subscription1.unsubscribe();
      this.sub2.unsubscribe();
      this.sub3.unsubscribe();
      this.sub4.unsubscribe();
      this.adminSub.unsubscribe();
  }
}