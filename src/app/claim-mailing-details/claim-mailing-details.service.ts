import { Injectable, OnDestroy } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { ClaimMailingDetailsModel } from "./claim-mailing-details.model";
import { Subject, Subscription } from "rxjs";
import { AdminService } from "../admin/admin.service";

@Injectable({ providedIn: 'root' })
export class ClaimMailingDetailsService implements OnDestroy {
  private url: string = 'BillingInformation';
  changeBillingDBData = new Subject<ClaimMailingDetailsModel[]>();
  private billingData: ClaimMailingDetailsModel[] = [];
  billingSub: Subscription;
  isLoading = new Subject<boolean>();
  isAdmin = new Subject<boolean>();

  constructor(private db: AngularFireDatabase, private adminService: AdminService) {
    this.adminService.isAdmin.subscribe(data => {
      this.isAdmin.next(data)
    })
  }

  addBillingAddress(data: ClaimMailingDetailsModel): void {
    this.isLoading.next(true)
    this.db.list(`${this.url}`).push(data)
      .then(() => {
        console.log('Billing address added successfully!');
        this.isLoading.next(false);
      })
      .catch(error => {
        console.error('Error adding billing address:', error);
        this.isLoading.next(false);
      });
  }

  fetchBillingData(): void {
    this.isLoading.next(true);
    this.billingSub = this.db.object<any>(`${this.url}`).valueChanges().subscribe(
        data => {
            const convertedData = data
                ? Object.keys(data).map(key => ({ [key]: data[key] }))
                : []; 
            this.setBillingData(convertedData);
            this.isLoading.next(false);
        },
        error => {
            console.error('Error fetching data:', error);
            this.isLoading.next(false);
        }
    );
}

  private setBillingData(billingDBData: ClaimMailingDetailsModel[]): void {
    this.billingData = billingDBData;
    this.changeBillingDBData.next([...this.billingData]);
  }

  getBillingData(): ClaimMailingDetailsModel[] {
    return [...this.billingData];
  }

  editBilling(editData: Partial<ClaimMailingDetailsModel>, editKey: string): void {
    this.isLoading.next(true);
    this.db.object(`${this.url}/${editKey}`).update(editData)
      .then(() => {
        console.log('Billing data updated successfully!');
        this.isLoading.next(false);
      })
      .catch(error => {
        console.error('Error updating billing data:', error);
        this.isLoading.next(false);
      });
  }

  deleteBillingData(deleteKey: string): void {
    this.isLoading.next(true);
    this.db.object(`${this.url}/${deleteKey}`).remove()
      .then(() => {
        alert('The billing information is deleted!');
        this.isLoading.next(false);
      })
      .catch(error => {
        console.error('Error deleting billing data:', error);
        this.isLoading.next(false);
      });
  }

  editNote(note: string, editKey: string): void {
    this.isLoading.next(true);
    this.db.object(`${this.url}/${editKey}`).update({ note })
      .then(() => {
        console.log('Note updated successfully!');
        this.isLoading.next(false);
      })
      .catch(error => {
        console.error('Error updating note:', error)
        this.isLoading.next(false);
      });
  }

  ngOnDestroy(): void {
    if (this.billingSub) {
      this.billingSub.unsubscribe();
    }
  }
}
