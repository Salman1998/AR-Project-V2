import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebsiteService } from './website.service';
import { AdminService } from '../admin/admin.service';
@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit, OnDestroy {
  websiteData = [];
  error: string = null;
  isLoading: boolean = true;
  isEdit = false;
  isAdded = false;
  editKey: any;
  editIndex: number;
  isAdmin: boolean = false;
  editValue = {};
  passwordVisible = false;
  filterData;
  
  private changedSub: Subscription;
  private errorSub: Subscription;
  private loadingSub: Subscription;
  private adminSub: Subscription;

  constructor(private adminService: AdminService, private websiteService: WebsiteService) {}

  ngOnInit(): void {
    this.loadWebsiteData();
    this.setupSubscriptions();
  }

  // Load initial data and set up necessary subscriptions
  private loadWebsiteData(): void {
    this.adminSub = this.adminService.isAdmin.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    })
    this.websiteService.fetchWebsiteData();
    this.websiteData = this.websiteService.getWebsiteData();
  }

  // Set up subscriptions for data changes, error, and loading states
  private setupSubscriptions(): void {
    this.changedSub = this.websiteService.changeWebsiteData.subscribe(
      respData => this.websiteData = respData
    );

    this.errorSub = this.websiteService.error.subscribe(error => {
      this.error = error;
      this.errorHandler();
    });

    this.loadingSub = this.websiteService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
      if(this.isLoading){
        this.disableScroll();
      }else{
        this.enableScroll();
      }
    });
  }

  onStoreData(): void {
    // Uncomment and pass data if needed: this.websiteService.storeData(this.websiteData);
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
      this.editValue = this.websiteData[index][key];
      this.disableScroll();
      return
      
    }

    alert('You are not allowed to edit this data! Please contact the admin.');
    
  }

  onAddWebsite(): void {
    this.isAdded = !this.isAdded;
  }

  onSubmitEdit(form: NgForm): void {
    if (form.invalid) {
      this.error = 'Please enter valid information!';
      this.errorHandler();
      return;
    }
    this.websiteService.editWebsiteData(form.value, this.editKey);
    this.isEdit = false;
  }

  onSubmitAdded(form: NgForm): void {
    this.websiteService.addWebsiteData(form.value);
    this.isAdded = false;
  }

  onDeleted(deleteKey: any): void {
    if(this.isAdmin){
      if (confirm('Are you sure you want to delete this item?')) {
        this.websiteService.deleteWebsiteData(deleteKey);
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
