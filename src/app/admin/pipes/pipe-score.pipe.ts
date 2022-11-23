import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeScore'
})
export class PipeScorePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 0) return value;
    const resultPosts = [];
    try {
      
      for (const post of value) {
        let nombre:string=post[0].nombre+"";
        let cuenta:string=post[0].cuenta+"";
        let letra:string=arg+"";
        if (nombre.toLowerCase().indexOf(letra.toLowerCase()) > -1||cuenta.toLowerCase().indexOf(letra.toLowerCase()) > -1) {
          resultPosts.push(post);
        };
      };
      
    } catch (error) {  
    }
    return resultPosts;
  }
}
