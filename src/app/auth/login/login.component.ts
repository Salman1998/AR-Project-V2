import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading = false;
  loadingSub : Subscription;
  errorSub : Subscription;
  error: string = null;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.loadingSub = this.authService.isLoading.subscribe(isLoading => this.isLoading = isLoading)
    this.errorSub = this.authService.error?.subscribe(error => {
      this.error = error; 

      setTimeout(() => {
        this.error = null
      }, 3000)
    })
  }

  onLogin(authForm:NgForm){
    this.authService.login(authForm.value.email, authForm.value.password)
  }

  ngOnDestroy(){
    this.loadingSub.unsubscribe()
    this.errorSub.unsubscribe()
  }
}
