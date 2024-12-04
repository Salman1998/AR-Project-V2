import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Subject } from "rxjs";


@Injectable({ providedIn: 'root' })
export class AdminService {
    changedAdminUser = new Subject<string[]>()
    private adminUsers: string[];


    constructor(private db: AngularFireDatabase){}


    fatchData(){
        this.db.object(`adminUsers/${0}`).valueChanges().subscribe(data => {
            const coveredData = Object.keys(data).map(key => (data[key]));
            this.setAdminUserData(coveredData);
        })
    
    }

    setAdminUserData(data: string[]){
        this.adminUsers = data;
        this.changedAdminUser.next([...this.adminUsers]);
    }

    getAdminUserData(){
        return [...this.adminUsers];
    }
  
}
         