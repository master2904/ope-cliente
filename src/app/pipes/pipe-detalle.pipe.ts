import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterD'
})
export class PipeDPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 0) return value;
    const resultPosts = [];
    for (const post of value) {
      let nombre:string=post.descripcion+"";
      console.log(nombre);
      
      let letra:string=arg+"";
      if (nombre.toLowerCase().indexOf(letra.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }
}
