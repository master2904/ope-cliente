import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterL'
})
export class FilterLPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 0) return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.aula.indexOf(arg) > -1) {
        // if (post.aula.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
