import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filterDataWebsite',
  // pure: false
})
export class FilterDataWebsitePipe implements PipeTransform {
  transform(value: any[], filterData: string): any[] {
    if (!value || value.length === 0 || !filterData) {
      // console.log("Pipe: No data or filterData is empty.");
      return value;
    }

    const lowerCaseFilter = filterData.toLowerCase();
     return value.filter(item => {
    //   // Check if name or otherPayer matches the filter string
      return (item.value.name && item.value.name.toString().toLowerCase().includes(lowerCaseFilter))  
             || (item.value.name && item.value.name.toString().toLowerCase().includes(lowerCaseFilter))  
             || (item.value.otherPayer && item.value.otherPayer.toString().toLowerCase().includes(lowerCaseFilter))
    });

  }
}