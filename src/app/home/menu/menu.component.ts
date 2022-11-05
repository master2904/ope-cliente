import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  menuList:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  imagen(){
    return "";
  }
  getrol(){
    return "";
  }
  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {
    this.menuList=[
      {
        "text": "Organizacion",
        "icon": "settings",
        "children": [
            {
                "text": "Usuario",
                "icon": "people",
                "routerLink": "/admin/usuario"
            },
            {
                "text": "Laboratorio",
                "icon": "domain",
                "routerLink": "/admin/laboratorio"
            }
        ]
      },
      {
        "text": "Competencia",
        "icon": "new_releases",
        "children": [
            {
                "text": "Concurso",
                "icon": "event",
                "routerLink": "/admin/concurso"
            },
            {
                "text": "Categoria",
                "icon": "merge",
                "routerLink": "/admin/categoria"
            },
            {
                "text": "Problema",
                "icon": "book",
                "routerLink": "/admin/problema"
            },
            {
                "text": "Equipo",
                "icon": "group_work",
                "routerLink": "/admin/equipo"
            }
        ]
      } 
    ];
  }

}

