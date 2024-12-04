import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Subject, Subscription } from "rxjs";
import { podiatryDenialsModel } from "./podiatry-denials.model";

@Injectable({providedIn: 'root'})

export class podiatryDenialsService{
    url = 'PodiatryDenials'
    isLoading = new Subject<boolean>();
    changePodiatryDenials = new Subject<podiatryDenialsModel[]>;
    podiatryDenials: podiatryDenialsModel[] = []
    pDenialSub: Subscription;
    isAdmin: boolean;

    constructor(private db: AngularFireDatabase){}

    AddPodiatryData(data: podiatryDenialsModel){
        this.db.list(`${this.url}`).push(data);
    }

    fatchPodiatryData(){
        this.pDenialSub = this.db.object<any>(`PodiatryDenials`).valueChanges().subscribe(data => {
          const convertedData: any = Object.keys(data).map(key => {
                return { [key]: data[key] };
            }, error => {
              // this.handleError(error)
              this.isLoading.next(false);
            })
          this.setPodiatryData(convertedData);
        });
        
       this.isLoading.next(false)
      }
    
      setPodiatryData(podiatryDenialsData: podiatryDenialsModel[]){
        // console.log(websiteData)
        this.podiatryDenials = podiatryDenialsData;
        this.changePodiatryDenials.next(this.podiatryDenials.slice())
      }
    
      getPodiatryData(){
        return this.podiatryDenials.slice();
      }

      editPodiatry(editData: {}, editKey: any){
        this.isLoading.next(true);
        this.db.object(`${this.url}/${editKey}`).update(editData)
        .then(() => console.log('Data updated successfully!'))
        .catch(error => console.error('Error updating data:', error));
        this.isLoading.next(false);
      }

      deletePodiatryData(deleteKey){
        this.isLoading.next(true);
        this.db.object(`${this.url}/${deleteKey}`).remove().then(() => {
          alert('The website is deleted!');
        }).catch(error => {
          console.log(error)
        })
        this.isLoading.next(false);
      }

      editNote(Note: string, editKey: string){
        this.isLoading.next(true);
        this.db.object(`${this.url}/${editKey}`).update({note: Note})
        .then(() => console.log('Data updated successfully!'))
        .catch(error => console.error('Error updating data:', error));
        this.isLoading.next(false);
      }

      ngDestroy(){
        this.pDenialSub.unsubscribe()
      }
}