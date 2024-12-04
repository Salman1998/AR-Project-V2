import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  isLoading = false;
  loadingSub: Subscription;
  errorSub: Subscription;
  error: string = null;

  constructor(private authService: AuthService){}  

  ngOnInit(){
    this.loadingSub = this.authService.isLoading.subscribe(isLoading => this.isLoading = isLoading)
    this.errorSub = this.authService.error.subscribe(error => {
      this.error = error;
      setTimeout(() => {
        this.error = null;
      }, 3000)
    })
  }

  async onSingup(form: NgForm){
    await this.authService.signup(form.value.email, form.value.password, form.value.name)
  }

  ngOnDestroy(){
    this.loadingSub.unsubscribe()
    this.errorSub.unsubscribe()
  }



}
