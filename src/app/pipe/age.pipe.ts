import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string) {
    const date = new Date(value);
    const currentDate = new Date()
    date.getFullYear()
    return currentDate.getFullYear() - date.getFullYear();
  }

}
