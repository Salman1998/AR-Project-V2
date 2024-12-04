import { Component} from '@angular/core';
import { ChatService } from '../chat/chat.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first} from 'rxjs';

@Component({
  selector: 'app-other-chat-activity',
  templateUrl: './other-chat-activity.component.html',
  styleUrl: './other-chat-activity.component.css'
})
export class OtherChatActivityComponent {

  reactions = ['👍', '❤️', '😂', '😲', '😢', '😠', '']; // Reaction emojis
  reactionsVisible = false; // Controls visibility of the reaction box

  action: any = null;
  isAction: boolean = false;

  currentUid;
  currentMsgKey;
  currentName;


  constructor(private chatService: ChatService, private db: AngularFireDatabase){}


  ngOnInit(){

  }

  showReactions() {
    this.reactionsVisible = true;
  }
  
  
  hideReactions() {
    this.reactionsVisible = false;
  }


  onAddReaction(reaction: string) {
    const data = this.chatService.chatData;
  
    // Iterate over the data array to find the message with currentMsgKey
    for (const item of data) {
      if (item[this.currentMsgKey]) {
        // Get the reactions object from the item with currentMsgKey
        const reactions = item[this.currentMsgKey].reactions;
  
        // Firebase path for easy reusability
        const reactionPath = `chatStorage/${this.currentMsgKey}/reactions/${this.currentUid}`;
  
        // Check if reactions contains currentUid
        if (reactions && reactions[this.currentUid]) {
          // Using firstValueFrom to avoid multiple subscriptions
          this.db.object<any>(reactionPath).valueChanges().pipe(first()).subscribe(resp => {
            if (resp && resp.reaction === reaction) {
              this.db.list<any>(reactionPath).remove().then(() => {

                console.log('removed');
              });
              console.log('Same reaction already exists');
            } else {
              this.db.object(reactionPath).update({ reaction: reaction })
                .then(() => console.log('Reaction updated successfully'))
                .catch(error => console.error('Error updating reaction:', error));
            }
          });
        } else {
          // If no existing reaction, set a new one
          this.db.object(reactionPath).set({
            key: this.currentMsgKey,
            name: this.currentName,
            reaction: reaction,
          })
          .then(() => console.log('Reaction set successfully'))
          .catch(error => console.error('Error setting reaction:', error));
        }
        return true; // Return true once the reaction is handled
      }
    }
    return false; // Return false if currentMsgKey is not found in data
  }

 
onDefualt(uid: string, msgKey: string, name: string){
  this.currentUid = uid;
  this.currentMsgKey = msgKey;
  this.currentName = name;
}

}
