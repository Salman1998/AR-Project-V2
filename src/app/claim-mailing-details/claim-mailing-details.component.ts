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
  error;
  isEdit: boolean = false;
  isAdded: boolean = false;
  editKey: any;
  editIndex: number;
  passStrength: string;
  passwordVisible: boolean = false;  // This keeps track of password visibility
  editValue: {};
  isAdminUser: boolean = false;

  private changedSub: Subscription;
  private isLoadingSub: Subscription;
  private adminSub: Subscription;
  
  constructor(
    private CMDS: ClaimMailingDetailsService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.CMDS.getBillingData();
    this.CMDS.fetchBillingData();

    this.changedSub = this.CMDS.changeBillingDBData.subscribe(data => {
      this.mailingDetails = data;
    });

    this.isLoadingSub = this.CMDS.isLoading.subscribe(isloading => {
      this.isLoading = isloading;
    });

    this.adminSub = this.adminService.isAdmin.subscribe(isAdmin => {
      this.isAdminUser = isAdmin;
    });
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

  onOpenEdit(key: any, i: number): void {
    if (!this.isAdminUser) {
      alert('You do not have permission to edit this data.');
      return;
    }
    this.disableScroll();
    this.isEdit = true;
    this.editKey = key;
    this.editIndex = i;
    this.editValue = this.mailingDetails[i][key];
  }


  onAddMailing(){
    this.disableScroll()
    this.isAdded = !this.isAdded;
  }


  onDeleted(deleteKey: any): void {
    if (!this.isAdminUser) {
      alert('You do not have permission to delete this data.');
      return;
    }
    if (confirm('Are you sure you want to delete?')) {
      this.CMDS.deleteBillingData(deleteKey);
    }
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

  onSubmitEdit(form: NgForm): void {
    if (!this.isAdminUser) {
      alert('You do not have permission to edit this data.');
      return;
    }
    this.CMDS.editBilling(form.value, this.editKey);
    this.isEdit = false;
    this.enableScroll();
  }

  private disableScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  private enableScroll() {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }

  ngOnDestory(){
    this.changedSub?.unsubscribe();
    this.isLoadingSub?.unsubscribe();
    this.adminSub?.unsubscribe();
  }
}
