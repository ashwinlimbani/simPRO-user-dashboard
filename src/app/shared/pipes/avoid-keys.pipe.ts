import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avoidKeys',
  standalone: true,
})
export class AvoidKeysPipe implements PipeTransform {
  transform(value: any, keys: Array<string>): any {
    const obj = { ...value };
    keys.forEach((key) => {
      delete obj[key];
    });
    return obj;
  }
}
