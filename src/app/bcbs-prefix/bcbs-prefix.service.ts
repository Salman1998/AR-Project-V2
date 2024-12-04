import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { catchError, Subject, Subscription } from "rxjs";
import { BCBSPrefixModel } from "./bcbs-prefix.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({providedIn: 'root'})

export class BCBSPrefixService{

changeWebsiteData = new Subject<BCBSPrefixModel[]>();
  url: string = 'BCBSPrefix';
  private BCBSPrefixData: BCBSPrefixModel[] = [];
  error = new Subject<string>();
  isLoading = new Subject<boolean>();
  private webSub: Subscription;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {}

  // Store data with error handling
  storeData(BCBSPrefixData: BCBSPrefixModel[]): void {
    this.isLoading.next(true);
    this.db.object(`${this.url}`).set(BCBSPrefixData)
      .then(() => this.isLoading.next(false))
      .catch(error => this.handleError(error));
  }

  // Fetch website data with error handling
  fetchBCBSPrefix(): void {
    this.isLoading.next(true);
    this.webSub = this.db.object(`${this.url}`).valueChanges()
      .pipe(catchError(error => this.handleError(error)))
      .subscribe(data => {
        if (data) {
          const convertedData = Object.keys(data).map(key => ({ [key]: data[key] }));
          this.setBCBSPrefixData(convertedData);
        } else {
          this.setBCBSPrefixData([]);
        }
        this.isLoading.next(false);
      }, error => this.handleError(error));
  }

  // Set website data and emit changes
  private setBCBSPrefixData(BCBSPrefixData: any[]): void {
    this.BCBSPrefixData = BCBSPrefixData;
    this.changeWebsiteData.next([...this.BCBSPrefixData]);
  }

  // Get a copy of website data
  getBCBSPrefixData(): BCBSPrefixModel[] {
    return [...this.BCBSPrefixData];
  }

  // Edit specific website data with error handling
  editBCBSPrefixData(editData: {}, editKey: string): void {
    this.isLoading.next(true);
    this.db.object(`${this.url}/${editKey}`).update(editData)
      .then(() => {
        console.log('Data updated successfully!');
        this.isLoading.next(false);
      }
      ).catch(error => {
        this.handleError(error);
        this.isLoading.next(false);
      });
  }

  // Add new website data with error handling
  addBCBSPrefix(addedData: {}): void {
    this.isLoading.next(true);
    this.db.list(`${this.url}`).push(addedData)
      .then(() => {
        alert('The new item has been updated'); 
        this.isLoading.next(false);
      })
      .catch(error => {
        this.handleError(error);
        this.isLoading.next(false);
    });
  }

  // Delete specific website data with error handling
  deleteBCBSPrefix(deleteKey: string): void {

      this.isLoading.next(true);
      this.db.object(`${this.url}/${deleteKey}`).remove()
        .then(() => {
          alert('The website is deleted!');
          this.isLoading.next(false);
      })
        .catch(error => {
          this.handleError(error);
        });
  }

  // Placeholder method for future implementation
  editNote(editKey: any, editNote: string): void {

    // this.isLoading.next(true);
    // this.db.object(`${this.url}/${editKey}`).valueChanges().subscribe(data => console.log('BCBS:', data))
    // .update({note: editNote})
    //     .then(() => {
    //       console.log('Data updated successfully!');
    //       this.isLoading.next(false);
    //     })
    //     .catch(error => {
    //       console.error('Error updating data:', error);
    //       this.isLoading.next(false);
    //     });
  }

  // Handle errors and emit messages to error Subject
  private handleError(error: HttpErrorResponse | any): any {
    console.error('An error occurred:', error);
    this.error.next('An error occurred while processing your request.');
    this.isLoading.next(false);
  }

  // Clean up subscription on component/service destruction
  ngOnDestroy(): void {
    if (this.webSub) {
      this.webSub.unsubscribe();
    }
  }
}