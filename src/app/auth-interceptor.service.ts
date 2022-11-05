import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Toast, ToastrService } from 'ngx-toastr';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
      private router: Router,
      private toastr:ToastrService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token= localStorage.getItem('token-ope');
    let request = req;
    if(token){
      let payload:string = token.split('.')[1];
      const value =atob(payload);
      const json=JSON.parse(value);
      const now=Math.floor(Date.now()/1000);
      if(json.exp>=now){
        // console.log("entre aqui");
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${ token }`
          }
        });
        // console.log(request);
      }
      else{
        this.toastr.warning('Expiro su tiempo de Sesion','Atencion');
        localStorage.removeItem('token-ope');
        localStorage.removeItem('rol');
        this.router.navigateByUrl("/home/login");
      }
    }
    else{
      // console.log("rrrrrrr");
      this.router.navigateByUrl("/home/login");
      localStorage.removeItem('token-ope');
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/');
        }
        return throwError( err );
      })
    );
  }
}