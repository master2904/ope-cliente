import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesGuard } from './roles.guard';
const routes: Routes = [
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(a => a.AdminModule),
    data:{
      role:'1'
    },
    canActivate:[RolesGuard]
  },
  {
    path:'logistica',
    loadChildren:()=>import('./logistica/logistica.module').then(a => a.LogisticaModule),
    data:{
      role:'2'
    },
    canActivate:[RolesGuard],
  },
  {
    path:'staff',
    loadChildren:()=>import('./staff/staff.module').then(a => a.StaffModule),
    data:{
      role:'3'
    },
    canActivate:[RolesGuard]
  },
  {
    path:'home',
    loadChildren:()=>import('./home/home.module').then(a => a.HomeModule)
  },
  {
    path:'**',
    loadChildren:()=>import('./home/home.module').then(a => a.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//,{useHash:true})],

  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
