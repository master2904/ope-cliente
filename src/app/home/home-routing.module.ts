import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from '../app.component';
import { AcercaComponent } from './acerca/acerca.component';
import { SliderComponent } from './slider/slider.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'',component:SliderComponent},
      {path:'login',component: LoginComponent},
      {path:'acerca',component: AcercaComponent},
      {path:'**',redirectTo:''}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
