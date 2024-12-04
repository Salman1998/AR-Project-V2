import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { map, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoading = new Subject<boolean>();
  authState = new Subject<boolean>();
  error = new Subject<string>();

  uid;
  authStateSub: Subscription;

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) { }

  async signup(email: string, password: string, name: string): Promise<void> {
    this.isLoading.next(true);
    try {
      if (!email || !password || !name) {
        throw new Error('Email and password are required.');
      }
  
      const userCredentials = await this.afAuth?.createUserWithEmailAndPassword(email, password);
  
      if (userCredentials && userCredentials.user) {
        const userData = {
          email: email,
          createdAt: new Date().toISOString(),
          uid: userCredentials.user.uid,
          name: name,
          type: 'user'
        };
  
        await this.db.object(`users/${userCredentials.user.uid}`).set(userData);
        console.log('User registered successfully!');
        this.authStateSub = this.afAuth.authState.pipe(map(user  => !!user)).subscribe(isAuthenticated => {
          this.authState.next(isAuthenticated);
        })
        this.router.navigate(['/home'])
        this.isLoading.next(false);
      }
    } catch (error: any) {
      this.errorHandler(error.code);
      this.isLoading.next(false);
    }
  }

  async login(email, password){
    this.isLoading.next(true);
    try {
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }
      
      this.afAuth.signInWithEmailAndPassword(email, password)?.then( respData => {
        this.authStateSub = this.afAuth?.authState.pipe(map(user  => !!user)).subscribe(isAuthenticated => {
          this.authState?.next(isAuthenticated);
        })
        this.router.navigate(['/home']);
        this.isLoading.next(false);
      }).catch(error => {
        this.errorHandler(error.code);
        this.isLoading.next(false);
      });
      
      
    } 
    catch (error: any) {
      typeof error;
      this.errorHandler(error.code);
      this.isLoading.next(false);
    }
    
  }
  
  private errorHandler(errorMsg){
    switch(errorMsg){
      case 'auth/invalid-credential':
        this.error.next('Invalid credential')
      break;
      case 'auth/email-already-in-use':
        this.error.next('Email already')
      break;
      default: 
        this.error.next(errorMsg);
        break;
    }
    // console.log("Error: " + errorMsg);
}

async logout(){
  await this.afAuth.signOut().then(() => {
    localStorage.clear();
    this.router.navigate(['/login'])
  });
}

ngOnDestroy(){
  this.authStateSub.unsubscribe();
}

}
