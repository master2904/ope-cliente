import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(private route:Router,private toastr:ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log(localStorage.getItem('rol'))
      // return true;
    return this.verificar(route);
  }
  verificar(route:ActivatedRouteSnapshot):boolean{
    // const{ scopes=[]}=;
    var rol=localStorage.getItem('rol');
    if(route.data.role==rol)
      return true;
    else {
      localStorage.removeItem('token-ope');
        localStorage.removeItem('rol');
      this.route.navigateByUrl('home');
      return false;
    }
  }
}
