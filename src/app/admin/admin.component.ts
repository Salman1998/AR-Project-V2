// import { Component } from '@angular/core';
// import { AdminService } from './admin.service';
// import { user } from '@angular/fire/auth';


// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrl: './admin.component.css'
// })
// export class AdminComponent {

//   users: any[] = [];
//   isAdmin: boolean = false;
//   isEdit: boolean = false;
//   editKey: any;
//   editIndex: number;
//   editValue: any;
//   isAdded: boolean;

//   constructor(private adminService: AdminService){}

//   ngOnInit(){
//     this.adminService.fatchData();

//     this.users = this.adminService.getUserData()

//     this.adminService.changedUser.subscribe(data => {
//       this.users = data;
//     })

//     this.adminService.isAdmin.subscribe(data => {
//       this.isAdmin = data;
//     })
//   }


//   onOpenEdit(key: any, index: number): void {
//     if(this.isAdmin){
//       this.isEdit = true;
//       this.editKey = key;
//       this.editIndex = index;
//       this.editValue = this.users[index][key];
//       // this.disableScroll();
//       return
//     }

//     alert('You are not allowed to edit this data! Please contact the admin.');
    
//   }

//   onSubmitEdit(editData){
//     this.adminService.editUserData(editData, this.editKey)
//     this.isEdit = false;
//   }

//   onClose(): void {
//     this.editValue = {};
//     this.isEdit = false;
//     this.isAdded = false;
//     // this.enableScroll();
//   }
// }


import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] // Fixed typo
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  isAdmin: boolean = false;
  editState = {
    isEdit: false,
    editKey: null,
    editIndex: -1,
    editValue: null
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.fetchData();

    this.adminService.changedUser.subscribe(users => {
      this.users = users;
    });

    

    this.adminService.isAdmin.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  onOpenEdit(key: string, index: number): void {

    if (!this.isAdmin) {
      alert('You are not allowed to edit this data! Please contact the admin.');
      return;
    }



    this.editState = {
      isEdit: true,
      editKey: key,
      editIndex: index,
      editValue: { ...this.users[index][key] }
    };

  }

  onSubmitEdit(editData: any): void {
    if (!this.editState.editKey) return;

    this.adminService.editUserData(editData, this.editState.editKey);
    this.resetEditState();
  }

  onClose(): void {
    this.resetEditState();
  }

  private resetEditState(): void {
    this.editState = {
      isEdit: false,
      editKey: null,
      editIndex: -1,
      editValue: null
    };
  }
}
