import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterColegio'
})
export class FilterColegioPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '' || arg.length < 0) return value;
    const resultPosts = [];
    for (const post of value) {
      // if (post.nombre.indexOf(arg) > -1 ){// ||post.cuenta.indexOf(arg) > -1) {
        if (post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }}
