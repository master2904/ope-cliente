import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterU'
})
export class FilterUPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 0) return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }
}
