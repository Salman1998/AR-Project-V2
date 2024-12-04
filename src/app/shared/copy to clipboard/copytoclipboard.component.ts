import { Component } from "@angular/core";
import { WebsiteService } from "../../website/website.service";

@Component({
    selector: 'app-copytoclip',
    template: '<div *ngIf="isClicked">Copied!</div>',
    styleUrls: ['./copytoclipboard.component.css']
})

export class CopyToClipComponent {

constructor(private websiteService: WebsiteService){}

isClicked: boolean = false;

onClicked(data){
    // console.log(data);
    if(data === '' || null || undefined || data === ' ' || data === '-' ){
        this.websiteService.error.next('There is no data to copy!');
        setTimeout(() => {
            this.websiteService.error.next(null);
        }, 500);
    return;
    }
    this.isClicked = !this.isClicked;
    setTimeout(() => {
        this.isClicked = false;
    }, 500);
}
}