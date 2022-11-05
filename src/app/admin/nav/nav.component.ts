import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, Routes } from '@angular/router';
import { faBars} from '@fortawesome/free-solid-svg-icons';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService , private toastr:ToastrService, private route:Router) { }
  cerrar_sesion(){
    this.auth.logout();
    this.route.navigateByUrl('/home');
    this.toastr.warning('Finalizaste sesion','Exito');
  }
  getrol(){
    const rol=localStorage.getItem('rol');
    if(rol==="1")
      return "Administrador";
    if(rol==="2")
      return "Usuario";
    if(rol==="3")
      return "Staff";
    return "";
  }
  nombre(){
    return localStorage.getItem('nombre');
  }
  imagen(){
    return localStorage.getItem('imagen');
  }
  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", function(event) {

      const showNavbar = (toggleId, navId, bodyId, headerId) =>{
      const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId)
      
      // Validate that all variables exist
      if(toggle && nav && bodypd && headerpd){
      toggle.addEventListener('click', ()=>{
      // show navbar
      nav.classList.toggle('show')
      // change icon
      toggle.classList.toggle('bx-x')
      // add padding to body
      bodypd.classList.toggle('body-pd')
      // add padding to header
      headerpd.classList.toggle('body-pd')
      })
      }
      }
      
      showNavbar('header-toggle','nav-bar','body-pd','header')
      
      /*===== LINK ACTIVE =====*/
      const linkColor = document.querySelectorAll('.nav_link')
      
      function colorLink(){
      if(linkColor){
      linkColor.forEach(l=> l.classList.remove('active'))
      this.classList.add('active')
      }
      }
      linkColor.forEach(l=> l.addEventListener('click', colorLink))
      
      // Your code to run since DOM is loaded and ready
      });
      const mobileScreen = window.matchMedia("(max-width: 990px )");
      $(document).ready(function () {
          $(".dashboard-nav-dropdown-toggle").click(function () {
              $(this).closest(".dashboard-nav-dropdown")
                  .toggleClass("show")
                  .find(".dashboard-nav-dropdown")
                  .removeClass("show");
              $(this).parent()
                  .siblings()
                  .removeClass("show");
          });
          $(".menu-toggle").click(function () {
              if (mobileScreen.matches) {
                  $(".dashboard-nav").toggleClass("mobile-show");
              } else {
                  $(".dashboard").toggleClass("dashboard-compact");
              }
          });
      });
  }

}
