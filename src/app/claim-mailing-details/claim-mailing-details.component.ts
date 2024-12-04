import { Component,} from '@angular/core';
import { ClaimMailingDetailsModel } from './claim-mailing-details.model';
import { NgForm } from '@angular/forms';
import { ClaimMailingDetailsService } from './claim-mailing-details.service';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-claim-mailing-details',
  templateUrl: './claim-mailing-details.component.html',
  styleUrl: './claim-mailing-details.component.css'
})
export class ClaimMailingDetailsComponent {

  mailingDetails: ClaimMailingDetailsModel[] = [];
  dumpData: string;
  isLoading: boolean = true;
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
  isLoadingSub: Subscription
  sub1: Subscription

  constructor( private CMDS: ClaimMailingDetailsService, private adminService: AdminService){

  }

  ngOnInit(){
    // this.adminService.isAdmin().then((user) => {
        //     this.isAdmin = user;
        //   });
    this.CMDS.getBillingData();
    this.CMDS.fetchBillingData();
    this.changedSub = this.CMDS.changeBillingDBData.subscribe(data => {
     this.mailingDetails = data;
    })
    this.isLoadingSub = this.CMDS.isLoading.subscribe(isloading => {
     this.isLoading = isloading;
 })
  }

  onStoreData(){
    // this.CMDS.storeData(this.website);
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
      this.editIndex = i
      this.editValue = this.mailingDetails[i][key];
      return
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
        this.CMDS.deleteBillingData(deleteKey);
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

    this.CMDS.addBillingAddress(Addform.value)
    this.onAddMailing()
    this.enableScroll()
    Addform.reset();
  }

  onSubmitEdit(form: NgForm){
    this.CMDS.editBilling(form.value, this.editKey)
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
    this.isLoadingSub.unsubscribe();
    this.sub1.unsubscribe();
  }
}
