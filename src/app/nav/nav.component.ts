import { Component, HostListener } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { map, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  isAuthanticated: boolean;
  authSub: Subscription;

constructor(private authService: AuthService, private afAuth: AngularFireAuth){}

ngOnInit(){
  this.authSub =  this.afAuth.authState.pipe(map(user => !!user)).subscribe(isAuth => {
    this.isAuthanticated = isAuth;
  })
}

// -----------------------------------Start defual nav logic----------------------------------------------

dropdownOpen = false;

  toggleNavbar() {
    const navbarLinks = document.querySelector('.navbar-links');
    const authButtons = document.querySelector('.auth-buttons');
    if (navbarLinks) {
      navbarLinks.classList.toggle('active');
      authButtons.classList.toggle('active');
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    const dropdownElement = document.querySelector('.dropdown-content');
    const dropdownButton = document.querySelector('.dropbtn');

    if (dropdownElement && !dropdownElement.contains(targetElement) && !dropdownButton.contains(targetElement)) {
      this.dropdownOpen = false;
    }
  }
  // -----------------------------------End defual nav logic----------------------------------------------

  onChangeMode(mode: boolean){
    // this.authService.isLoginMode.next(mode);
  }

  onLogout(){
    this.authService.logout();
  }


  ngOnDestroy(){
    this.authSub.unsubscribe();
  }
}
