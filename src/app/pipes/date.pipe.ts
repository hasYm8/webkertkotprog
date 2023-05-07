import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: { seconds: number, nanoseconds: number }): string {
    const date = new Date(value.seconds * 1000 + value.nanoseconds / 1000000);
    return date.toLocaleString();
  }

}
