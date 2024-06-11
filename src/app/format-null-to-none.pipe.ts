import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNullToNone',
  standalone: true,
})
export class FormatNullToNonePipe implements PipeTransform {
  transform(value: any): string {
    return value === null ? 'None' : value;
  }
}
