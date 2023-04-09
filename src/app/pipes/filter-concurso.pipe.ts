import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterConcurso'
})
export class FilterConcursoPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 0) return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.titulo.indexOf(arg) > -1 ){// ||post.cuenta.indexOf(arg) > -1) {
        // if (post.nombrecompleto.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }
}
