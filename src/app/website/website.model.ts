export interface websiteData {
    name?: string;
    note?: string;
    otherPayer?: string;
    pass?: string;
    url?: string;
    userID?: string;
    id?: string;
  }
  
  export interface websiteModel {
    [key: string]: websiteData;
  }