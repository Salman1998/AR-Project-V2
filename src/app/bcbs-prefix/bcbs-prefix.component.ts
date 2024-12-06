import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BCBSPrefixService } from './bcbs-prefix.service';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-bcbs-prefix',
  templateUrl: './bcbs-prefix.component.html',
  styleUrl: './bcbs-prefix.component.css'
})
export class BcbsPrefixComponent {
  BCBSPrefixData = [];
  error: string = null;
  isLoading: boolean = true;
  isEdit = false;
  isAdded = false;
  isAdmin: boolean = false;
  editKey: any;
  editIndex: number;
  editValue = {};
  passwordVisible = false;
  filterData;
  
  private changedSub: Subscription;
  private errorSub: Subscription;
  private loadingSub: Subscription;
  private adminSub: Subscription
  constructor(private BCBSPrefixService: BCBSPrefixService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadBCBSPrefix();
    this.setupSubscriptions();
    this.adminSub = this.adminService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin)
  }
  private loadBCBSPrefix(): void {

    this.BCBSPrefixService.fetchBCBSPrefix();
    this.BCBSPrefixData = this.BCBSPrefixService.getBCBSPrefixData();
  }

  // Set up subscriptions for data changes, error, and loading states
  private setupSubscriptions(): void {
    this.changedSub = this.BCBSPrefixService.changeWebsiteData.subscribe(
      respData => this.BCBSPrefixData = respData
    );

    this.errorSub = this.BCBSPrefixService.error.subscribe(error => {
      this.error = error;
      this.errorHandler();
    });

    this.loadingSub = this.BCBSPrefixService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
      if(this.isLoading){
        this.disableScroll();
      }else{
        this.enableScroll();
      }
    });
  }

  onStoreData(): void {
    // Uncomment and pass data if needed: this.BCBSPrefixService.storeData(this.BCBSPrefixData);
  }

  copyToClipboard(text: string): void {
    console.log('Copied to clipboard: ' + text);
    navigator.clipboard.writeText(text).catch(err => console.error('Failed to copy: ', err));
  }

  onOpenEdit(key: any, index: number): void {
    if(this.isAdmin){
      this.isEdit = true;
      this.editKey = key;
      this.editIndex = index;
      this.editValue = this.BCBSPrefixData[index][key];
      this.disableScroll();
      return
    }

    alert('You are not allowed to edit this data! Please contact the admin.');

    
  }

  onAddWebsite(): void {
      this.isAdded = !this.isAdded;
      return;
    

  }

  onSubmitEdit(form: NgForm): void {
    if (form.invalid) {
      this.error = 'Please enter valid information!';
      this.errorHandler();
      return;
    }
    this.BCBSPrefixService.editBCBSPrefixData(form.value, this.editKey);
    this.isEdit = false;
  }

  onSubmitAdded(form: NgForm): void {
    this.BCBSPrefixService.addBCBSPrefix(form.value);
    this.isAdded = false;
  }

  onDeleted(deleteKey: any): void {
    
    if(this.isAdmin){
    if (confirm('Are you sure you want to delete this item?')) {
      this.BCBSPrefixService.deleteBCBSPrefix(deleteKey);
    }
    return
  }
  alert('You are not allowed to edit this data! Please contact the admin.');
  }

  onClear(form: NgForm): void {
    form.reset();
    
  }

  onClearSearch(){
    this.filterData = '';
  }



  onClose(): void {
    this.editValue = {};
    this.isEdit = false;
    this.isAdded = false;
    this.enableScroll();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // Error handler with timeout reset
  private errorHandler(): void {
    setTimeout(() => {
      this.error = null;
    }, 2000);
  }

  // Helper function to validate form fields
  private isFormInvalid(form: NgForm): boolean {
    const { name, userID, pass, url } = form.value;
    return form.invalid || !name || !userID || !pass || !url;
  }

  private disableScroll(){
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  private enableScroll(){
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }

  ngOnDestroy(): void {
    this.changedSub?.unsubscribe();
    this.errorSub?.unsubscribe();
    this.loadingSub?.unsubscribe();
    this.adminSub?.unsubscribe();
  }
}