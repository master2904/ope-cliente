import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterC'
})
export class FilterCliente implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 0) return value;
    const resultPosts = [];
    for (const post of value) {
      let nit:string=post.nit+"";      
      let nombre:string=post.nombre+"";      
      let letra:string=arg+"";
      if (nit.toLowerCase().indexOf(letra.toLowerCase()) > -1||nombre.toLowerCase().indexOf(letra.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }
}
