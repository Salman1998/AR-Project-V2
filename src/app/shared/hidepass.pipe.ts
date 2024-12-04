import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidepass'
})
export class HidepassPipe implements PipeTransform {

  transform(value: any, ) {
    if(value === '' || value === undefined || value ===null){
      return value?.replace(value, '')
    }
    return value?.replace(value, "******");
  }

}
