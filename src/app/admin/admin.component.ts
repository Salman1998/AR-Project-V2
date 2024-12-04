import { Component } from '@angular/core';
import { AdminService } from './admin.service';
import { user } from '@angular/fire/auth';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  users: string[] = []
  isAdmin: boolean = false;
  isEdit: boolean = false;

  constructor(private adminService: AdminService){}

  ngOnInit(){
    this.adminService.fatchData();

    // this.users = this.adminService.getAdminUserData();
    this.adminService.changedAdminUser.subscribe(data => {
      this.users = data;
    })

    console.log(this.users)
  }
}
