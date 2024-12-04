import { Subject } from "rxjs";

export class CHService {
    chDataChanged = new Subject<{}[]>()

    private chData: {}[] = [
        {chName: 'Waystar', chImg: 'waystar.png'},
        {chName: 'Trizetto', chImg: 'Trizettor.png'},
        {chName: 'SSI Client Portal', chImg: 'SSI.png'},
        {chName: 'Optum Intelligent EDI', chImg: 'Optum.png'},
    ]

    getCHData(){
        return this.chData;
    }

    addChData(chData: {}[]){
        this.chData.push(...chData);
        this.chDataChanged.next(this.chData.slice());
    }
}