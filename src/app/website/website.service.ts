import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { websiteModel } from './website.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class WebsiteService implements OnDestroy {

  private url: string = 'websites';
  changeWebsiteData = new Subject<websiteModel[]>();
  private websiteData: websiteModel[] = [];
  error = new Subject<string>();
  isLoading = new Subject<boolean>();
  private webSub: Subscription;

  constructor(private authService: AuthService ,private db: AngularFireDatabase) {}

  fetchWebsiteData(): void {
    this.isLoading.next(true);
    this.webSub = this.db.object(`${this.url}`).valueChanges()
      .pipe(catchError(error => this.handleError(error)))
      .subscribe(data => {
        if (data) {
          const convertedData = Object.keys(data).map(key => ({ [key]: data[key] }));
          this.setWebsiteData(convertedData);
        } else {
          this.setWebsiteData([]);
        }
        this.isLoading.next(false);
      }, error => this.handleError(error));
  }

  // Set website data and emit changes
  private setWebsiteData(websiteData: websiteModel[]): void {
    this.websiteData = websiteData;
    this.changeWebsiteData.next([...this.websiteData]);
  }

  // Get a copy of website data
  getWebsiteData(): websiteModel[] {
    return [...this.websiteData];
  }

  // Edit specific website data with error handling
  editWebsiteData(editData: {}, editKey: string): void {
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
  addWebsiteData(addedData: {}): void {
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
  deleteWebsiteData(deleteKey: string): void {
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
    this.isLoading.next(true);
    this.db.object(`${this.url}/${editKey}`).update({note: editNote})
        .then(() => {
          console.log('Data updated successfully!');
          this.isLoading.next(false);

        })
        .catch(error => {
          console.error('Error updating data:', error);
          this.isLoading.next(false);
        });

      
  }

  // Handle errors and emit messages to error Subject
  private handleError(error: HttpErrorResponse | any): any {
    // console.log(error)
    this.isLoading.next(false)
    // console.error('An error occurred:', error);
    // this.error.next('An error occurred while processing your request.');
    // this.isLoading.next(false);
  }

  // Clean up subscription on component/service destruction
  ngOnDestroy(): void {
    if (this.webSub) {
      this.webSub.unsubscribe();
    }
  }
}
