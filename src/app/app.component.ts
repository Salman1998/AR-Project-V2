import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoLogoutService } from './auth/autologout.service';
import { AdminService } from './admin/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  private timeSubscription: Subscription;
  private authSubscription: Subscription;
  authState$: Observable<any>;
  isAuthenticated: boolean = false;
  isChat: boolean = false;

  constructor(
    private autoLogoutService: AutoLogoutService,
    private afAuth: AngularFireAuth,
    private adminService: AdminService
  ) {
    this.authState$ = this.afAuth.authState;
  }

  ngOnInit(): void {
    this.adminService.fetchData();
    // Subscribe to authentication state to track if the user is authenticated
    this.authSubscription = this.afAuth.authState.pipe(
      map(user => !!user) // Convert user to boolean (true if authenticated)
    ).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;

      if (this.isAuthenticated) {
        // If the user is authenticated, subscribe to the auto logout remaining time
        this.timeSubscription = this.autoLogoutService.remainingTime$.subscribe(remainingTime => {
          const minutes = Math.floor((remainingTime / 1000) / 60);
          // const seconds = Math.floor((remainingTime / 1000) % 60);

          // Update the browser tab with the remaining time
          // document.title = `AR Project - ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          document.title = `AR Project - less than ${minutes} minutes left until session expired `;
        });
      } else {
        // If the user is not authenticated, reset the browser tab title
        document.title = 'AR Project';
      }
    });
    
  }

  isChated(){

    if(this.isAuthenticated){
      this.isChat = !this.isChat;
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed to avoid memory leaks
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
