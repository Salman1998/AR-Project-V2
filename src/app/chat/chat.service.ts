import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AppComponent } from "../app.component";
import { ChatModel } from "./chat.model";
import { Subject, Subscription } from "rxjs";
import { UserModel } from "../auth/user.model";

@Injectable({providedIn: "root"})

export class ChatService{

    chatChanged= new Subject<ChatModel[]>;
    chatData: any = []
    currectUid: string;
    isLoading = new Subject<boolean>();
    userName: string;
    authSub: Subscription;
    authSub2: Subscription;
    fatchSub: Subscription;

    chatSub: Subscription;

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase){
        this.authSub = this.afAuth.authState.subscribe(user => {
            this.currectUid = user.uid;
        });

        this.authSub2 = this.afAuth.authState.subscribe(user => {
          this.db.object<UserModel>(`users/${user?.uid}`).valueChanges().subscribe(respData => {
            this.userName = respData.name;
            // console.log(respData)
    
          });
        });
    }

    fatchChatData(){
        this.fatchSub = this.chatSub = this.db.object(`chatStorage`).valueChanges().subscribe(data => {

          const convertedData: any = Object.keys(data).map(key => {
                return { [key]: data[key] };
        //     }, error => {
        //     //   this.handleError(error)
        //       this.isLoading.next(false)
            })
          this.setChatData(convertedData);

        });

        // this.setChatData(this.chatData);
      }

      setChatData(chatData: ChatModel[]){

        this.chatData = chatData;
        this.chatChanged?.next(this.chatData.slice())
      }

      getChatData(){
        return this.chatData.slice();
      }

    
    async sentChat(newMessage: string){

      const resp = new Date();

      const hours = resp.getHours(); 
      const minutes = resp.getMinutes(); 
      const seconds = resp.getSeconds(); 

      const cTime: string = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`

      const date = resp.getDate(); 
      const month = resp.getMonth()+1; 
      const year = resp.getFullYear(); 

      const cDate: string = `${date}/${month}/${year}`;

        this.db.list(`chatStorage`).push({
            uid: this.currectUid,
            createdAt: new Date().toISOString(),
            time: cTime,
            date: cDate,
            message: newMessage,
            name: this.userName,
            reactions: [],
        })
        
    }

    addReaction(reaction, key){
      // this.db.list<ChatModel>('chatStorage').update(key, {reactions: reaction})
    }

    ngDestroy(){
      this.authSub.unsubscribe();
      this.authSub2.unsubscribe();
      this.chatChanged.unsubscribe();
      this.fatchSub.unsubscribe();
    }
    
}