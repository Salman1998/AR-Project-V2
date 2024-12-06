// import { Injectable } from "@angular/core";
// import { AngularFireDatabase } from "@angular/fire/compat/database";
// import { Subject } from "rxjs";
// import { UserModel } from "../auth/user.model";
// import { AngularFireAuth } from "@angular/fire/compat/auth";
// import { user } from "@angular/fire/auth";


// @Injectable({ providedIn: 'root' })
// export class AdminService {
//     private user = 'users'
//     private adminUsers = 'adminUsers'
//     changedAdminUser = new Subject<string[]>()
//     changedUser = new Subject<string[]>()
//     private adminUser: string[] = [];
//     private users: any = [];
//     isAdmin = new Subject<boolean>();
//     private checkData;


//     constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth){}


//     fatchData(){
//         this.db.object(`adminUsers/${0}`).valueChanges().subscribe(data => {
//             const coveredData = Object.keys(data).map(key => (data[key]));
//             this.setAdminUserData(coveredData);
//         })
        
//         this.db.object(`users`).valueChanges().subscribe(data => {
//             this.isAdminCheck(data);
//             const coveredData = Object.keys(data).map(key => ({ [key]: data[key] }));
//             this.setUserData(coveredData);
//         })
    
//         this.changedAdminUser.subscribe(aUsers => {
//             this.adminUser = aUsers
//             this.isAdminCheck(this.checkData)
//         })

//     }

//     setAdminUserData(data: string[]){
//         this.adminUser = data;
//         this.changedAdminUser.next([...this.adminUser]);
//     }
    
//     setUserData(data: any){
//         this.users = data;
//         this.changedUser.next([...this.users]);
//     }

//     getAdminUserData(){ 
//         return [...this.adminUser];
//     }
    
//     getUserData(){ 
//         return [...this.users];
//     }

//     isAdminCheck(data){
        
//         this.checkData = data
//         this.afAuth.authState.subscribe(data => {
//             const currentUser = data?.uid;
            
//             if(this.checkData[currentUser]?.uid){
//                 if(this.adminUser?.includes(currentUser)){
//                     this.isAdmin.next(true);
//                 }else{
//                     this.isAdmin.next(false)
//                 }
//             }else{
//                 this.isAdmin.next(false);
//             }
//         })
//     }
  
//     editUserData(editData: any, editKey: string): void {
//         this.db.object(`${this.user}/${editKey}`).update(editData).then(() => {
//             console.log('Data updated successfully!');
//         }).catch(() => {
//             console.log('unknown errors occured!');
//         })



//        if(editData?.type === 'admin'){
//             if(this.adminUser?.includes(editKey)){
//                 console.log('user is already admin')
//             }else{
//                 this.adminUser?.push(editKey);
//                 this.db.object(`${this.adminUsers}/0`).update(this.adminUser)   
//             }
//        }else{

//         const index = this.adminUser.indexOf(editKey);

//         if(this.adminUser?.includes(editKey)){
//             this.db.list(`${this.adminUsers}/0/${index}`).remove();
//         }
//        }
//     }
// }


import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly userPath = 'users';
  private readonly adminUsersPath = 'adminUsers/0';
  changedAdminUser = new Subject<string[]>();
  changedUser = new Subject<any[]>();
  isAdmin = new BehaviorSubject<boolean>(false);

  private adminUsers: string[] = [];
  private users: any[] = [];
  private subscriptions: Subscription[] = [];
  private currentUserUID: string | null = null;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.currentUserUID = user?.uid || null;
      this.checkAdminStatus();
    });
    this.fetchAdminUsers();
  }

  fetchData(): void {
    this.subscriptions.push(
      this.db.object(this.adminUsersPath).valueChanges().subscribe(data => {
        if (data) {
          this.adminUsers = Object.values(data) as string[];
          this.changedAdminUser.next([...this.adminUsers]);
        }
      }),
      this.db.object(this.userPath).valueChanges().subscribe(data => {
        if (data) {
          this.users = Object.keys(data).map(key => ({ [key]: data[key] }));
          this.changedUser.next([...this.users]);
          this.checkAdminStatus();
        }
      })
    );
  }

  // private checkAdminStatus(): void {
  //   if (this.currentUserUID && this.adminUsers.includes(this.currentUserUID)) {
  //     this.isAdmin.next(true);
  //   } else {
  //     this.isAdmin.next(false);
  //   }
  // }

  private checkAdminStatus(): void {
    const isAdmin = !!this.currentUserUID && this.adminUsers.includes(this.currentUserUID);
    this.isAdmin.next(isAdmin); // Emit the latest value
  }

  editUserData(editData: any, editKey: string): void {
    this.db.object(`${this.userPath}/${editKey}`).update(editData).then(() => {
      console.log('Data updated successfully!');
    }).catch(err => {
      console.error('Error updating data:', err);
    });

    if (editData?.type === 'admin') {
      if (!this.adminUsers.includes(editKey)) {
        this.adminUsers.push(editKey);
        this.db.object(this.adminUsersPath).set(this.adminUsers);
      }
    } else {
      const index = this.adminUsers.indexOf(editKey);
      if (index !== -1) {
        this.adminUsers.splice(index, 1);
        this.db.object(this.adminUsersPath).set(this.adminUsers);
      }
    }
  }

  private fetchAdminUsers(): void {
    this.db.object(this.adminUsersPath).valueChanges().subscribe(data => {
      if (data) {
        this.adminUsers = Object.values(data) as string[];
        this.checkAdminStatus();
      }
    });
  }

  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
