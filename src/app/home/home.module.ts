import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { AcercaComponent } from './acerca/acerca.component';
import { LoginComponent } from './login/login.component';
import { SliderComponent } from './slider/slider.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

// import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [AcercaComponent, LoginComponent, SliderComponent, HomeComponent, NavComponent, MenuComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    
  ],
  exports: [
      HomeComponent
  ]
})
export class HomeModule { }
