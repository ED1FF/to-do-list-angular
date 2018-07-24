import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(value: any[], done: string, bol: boolean): any {
    if (!value) {
      return [];
    } else {
      return value.filter((item) => item.done == bol)
    }
  }
}
