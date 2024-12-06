import { Component } from '@angular/core';
import { AdminService } from '../admin/admin.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  
  constructor(private adminService: AdminService){}


  ngOnInit(){
    this.adminService.fetchData();
  }

}
