import { Component } from "@angular/core";
import { WebsiteService } from "../../website/website.service";
import { podiatryDenialsService } from "../../podiatry-denials/podiatry-denials.service";
import { ClaimMailingDetailsService } from "../../claim-mailing-details/claim-mailing-details.service";
import { BCBSPrefixService } from "../../bcbs-prefix/bcbs-prefix.service";
import { AdminService } from "../../admin/admin.service"; 

@Component({
    selector: 'app-notepopup',
    templateUrl: './notepopup.component.html',
    styleUrls: ['./notepopup.component.css']
})

export class NotePopupComponent {

    isVisible: boolean = false;
    webNote: string = 'No data found!';
    isEdit = false;
    isAdmin = false;
    editKey: string; 
    editType: string


    constructor(private websiteService: WebsiteService, private CMDS: ClaimMailingDetailsService, private PDS: podiatryDenialsService, private BCBSPS: BCBSPrefixService, private adminService: AdminService){}

    ngOnInit(){
        // this.adminService.isAdmin().then((user) => {
        //     this.isAdmin = user;
        //   });
    }

    openNote(note: string, editKey: string, type: string) {
        this.isVisible = true;
        this.editKey = editKey;
        this.webNote = note || 'No data found!';

        this.editType = type;
        this.disableScroll();
    }

    closeNote() {
        this.isVisible = false;
        this.enableScroll();
    }

    onEdit(){
        if(this.isAdmin){
            this.isEdit = true;
            return
        }
        alert('You are not allowed to edit this data! Please contact the admin.');
    }

    onEditClosed(){

        this.isEdit = false
    }

    onSave(){
        if(this.editType === 'website'){
            this.websiteService.editNote(this.editKey, this.webNote);
        }
        else if(this.editType === 'billing'){
            this.CMDS.editNote(this.webNote, this.editKey )
        }
        else if(this.editType === 'podiatryDenials'){
            this.PDS.editNote(this.webNote, this.editKey )

        }
        else if(this.editType === 'BCBSPrefix'){
            this.BCBSPS.editNote(this.webNote, this.editKey )
        }

        this.enableScroll()
    }

    private disableScroll() {
        document.body.style.overflow = 'hidden'; // Hide scroll on the body
        document.documentElement.style.overflow = 'hidden'; // Hide scroll on the html

        // this.previousScrollPosition = window.scrollY;    
    }

    private enableScroll() {
        document.body.style.overflow = 'auto'; // Restore scroll on the body
        document.documentElement.style.overflow = 'auto'; // Restore scroll on the html
        
    }
}