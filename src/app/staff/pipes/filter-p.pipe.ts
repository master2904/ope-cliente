import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterP'
})
export class FilterPPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
