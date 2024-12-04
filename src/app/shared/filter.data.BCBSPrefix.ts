import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filterDataBCBSPrefix',
  // pure: false
})
export class FilterDataBCBSPrefixPipe implements PipeTransform {
  transform(value: any[], filterData: string): any[] {
    if (!value || value.length === 0 || !filterData) {
      // console.log("Pipe: No data or filterData is empty.");
      return value;
    }

    const lowerCaseFilter = filterData.toLowerCase();
     return value.filter(item => {
    //   // Check if name or otherPayer matches the filter string
      return (item.value.state && item.value.state.toString().toLowerCase().includes(lowerCaseFilter)) 
      || (item.value.type && item.value.type.toString().toLowerCase().includes(lowerCaseFilter)) 
      || (item.value.prefix && item.value.prefix.toString().toLowerCase().includes(lowerCaseFilter))  
      || (item.value.name && item.value.name.toString().toLowerCase().includes(lowerCaseFilter))
    });

  }
}