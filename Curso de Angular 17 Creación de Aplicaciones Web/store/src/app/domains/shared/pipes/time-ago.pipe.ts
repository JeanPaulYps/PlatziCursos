import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(date: string | null): number {
    if (date === null) {
      return 0;
    }
    const dateParsed = new Date(date);
    if (!dateParsed) {
      return 0;
    }
    const diff = Date.now() -  dateParsed.getTime();
    console.log("now", Date.now());
    console.log('Parsed', dateParsed.getDate())
    console.log(dateParsed);

    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }

}
