export interface SListItem {
    sname: string;
  }
  
  export interface InsuranceModel {
    insImg: string;
    iname: string;
    eligibility: string;
    member_Id: string;
    claims: string;
    remit: string;
    appeal: string;
    key?: string;
    sList: SListItem[];
  }
  