import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { podiatryDenialsModel } from './podiatry-denials.model';
import { podiatryDenialsService } from './podiatry-denials.service';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin/admin.service';
@Component({
  selector: 'app-podiatry-denials',
  templateUrl: './podiatry-denials.component.html',
  styleUrl: './podiatry-denials.component.css'
})
export class PodiatryDenialsComponent {


  mailingDetails: podiatryDenialsModel[] = [];
  dumpData: string;
  isLoading: boolean = null;
  filterData;
  error
  isEdit: boolean = false;
  isAdded: boolean = false;
  isAdmin: boolean = false;
  editKey: any;
  editIndex: number;
  passStrength: string;
  passwordVisible: boolean = false;  // This keeps track of password visibility
  editValue: {};
  changedSub: Subscription
  adminSub: Subscription

  constructor(private PDS: podiatryDenialsService, private adminService: AdminService){

  }

  ngOnInit(){
      this.adminSub = this.adminService.isAdmin.subscribe(data => this.isAdmin = data)
      this.PDS.getPodiatryData();
      this.PDS.fatchPodiatryData();
      this.changedSub = this.PDS.changePodiatryDenials.subscribe(data => {
        // console.log(data)
        this.mailingDetails = data;
      });


  }

  onStoreData(){
    // this.websiteService.storeData(this.website);
  }

  copyToClipboard(text: string): void { 
    console.log('Copid to clipboard!: '+ text);
    navigator.clipboard.writeText(text);
    
  }

  onClearSearch(){
    this.filterData = '';
  }


  onOpenEdit(key: any, i: number){

    if(this.isAdmin){
      this.disableScroll()
      this.isEdit = true;
      this.editKey = key;
      this.editIndex = i;
      this.editValue = this.mailingDetails[i][key];
      return;
    }

    alert('You are not allowed to edit this data! Please contact the admin.');
    
  }
  onAddMailing(){
    this.disableScroll()
    this.isAdded = !this.isAdded;
  }


  onDeleted(deleteKey: any){
    if(this.isAdmin){
      if(confirm('Are you sure you want to delete!')){
        this.PDS.deletePodiatryData(deleteKey);
      }
      return
    }

    alert('You are not allowed to edit this data! Please contact the admin.');
    
  }


  onClose(){
    this.editValue = {};
    this.isEdit = false;
    this.isAdded = false;
    this.enableScroll()
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  errorHanler(){
    setTimeout(() => {
      this.error = null;
    }, 2000);
  }

  onSubmitAdd(Addform){
    const bilingData = {
      name: Addform.value.name,
      phone: Addform.value.phone,
      address: Addform.value.address,
      tfl: Addform.value.tfl,
      note: Addform.value.note,
    }

    this.PDS.AddPodiatryData(Addform.value)
    this.onAddMailing()
    Addform.reset();
    this.enableScroll()
  }

  onSubmitEdit(form: NgForm){
    this.PDS.editPodiatry(form.value, this.editKey)
    this.isEdit = false
    this.enableScroll()
  }

  private disableScroll() {
    document.body.style.overflow = 'hidden'; // Hide scroll on the body
    document.documentElement.style.overflow = 'hidden'; // Hide scroll on the html


}

private enableScroll() {
    document.body.style.overflow = 'auto'; // Restore scroll on the body
    document.documentElement.style.overflow = 'auto'; // Restore scroll on the html

    
}

  ngOnDestory(){
    this.changedSub.unsubscribe();
    this.adminSub.unsubscribe();
  }
}
