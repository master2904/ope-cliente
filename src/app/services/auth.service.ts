import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base=environment.base;
  constructor(private http:HttpClient) { }
  getUsers(){
    return this.http.get(`${this.base}users`);
  }
  logout(){
    localStorage.removeItem('token-ope');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
  }
  login(data:any){
    // console.log('aqui');  
    return this.http.post(`${this.base}login`,data)
    .pipe(
        map((success:any)=>{
          const tokenAF= `Bearer ${success['token']}`;    
          localStorage.setItem('token-ope',tokenAF);          
          // localStorage.setItem('token-ope',btoa(tokenAF));          
          // localStorage.setItem('token-ope',success);          
          return success;
        })
    );
  }
  // login(data:any){ 
  //   return this.http.post(`${this.base}login`,data);
  //   .pipe(
  //       map((success:any)=>{
  //         const tokenAF= `Bearer ${success.token}`;
  //         localStorage.setItem('token-ope',btoa(tokenAF));          
  //         return success;
  //       })
  //   );
  // }
}