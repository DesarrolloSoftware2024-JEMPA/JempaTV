import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adjustTime',
  standalone: true
})
export class AdjustTimePipe implements PipeTransform {

  transform(value: string | Date): Date {
        const date = new Date(value);
    return new Date(date.getTime() - (3 * 60 * 60 * 1000));
  }

}
