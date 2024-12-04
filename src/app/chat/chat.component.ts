import { Component, HostListener } from '@angular/core';
import { ChatModel } from './chat.model';
import { ChatService } from './chat.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messages: any = [];  // Array to store chat messages
  newMessage: string = '';  // Two-way data binding for the input
  currentUid: string;
  currentuserName: string;
  currentUser$: Observable<any>;
  timestamp: any;
  chatSub: Subscription;
  authSub: Subscription;
  action = '';


  menuVisible = false;
  menuX = 0;
  menuY = 0

  constructor(private chatService: ChatService, private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router){
    this.authSub = this.afAuth.authState.subscribe(user => {
      this.currentUid = user.uid
    this.currentUser$ = this.db.object(`users/${user?.uid}`).valueChanges();
  })

  
}

  ngOnInit(){
    this.chatService.fatchChatData();
    this.messages = this.chatService.getChatData();
    this.chatSub = this.chatService.chatChanged.subscribe(chatData => {
      this.messages = chatData;
    });

  }

  // Function to send a new message
  onSendMessage() {
    this.newMessage = this.newMessage.trim()
    
    if(this.newMessage === '' || this.newMessage === ' '){
      return
    }
    this.chatService.sentChat(this.newMessage);

      this.newMessage = '';
  }

  showAction(){
    console.log('right')
  }

  ngOnDestroy(){
    this.chatSub.unsubscribe();
    this.authSub.unsubscribe();
  }

  


}
