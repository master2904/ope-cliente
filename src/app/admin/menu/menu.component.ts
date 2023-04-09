import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ArrayDataSource } from '@angular/cdk/collections';
const TREE_DATA: ExampleFlatNode[] = [
  {
    name: "Ferreteria",
    icon: "new_releases",
    routerLink:"",
    expandable:true,
    level:0
  },
  {
      name: "Productos",
      icon: "event",
      routerLink: "/admin/producto",
      expandable:false,
      level:1,
  },
  {
      name: "Detalles",
      icon: "merge",
      routerLink: "/admin/detalle",
      expandable:false,
      level:1,
  },
  {
      name: "Inventario",
      icon: "storage",
      routerLink: "/admin/inventario",
      expandable:false,
      level:1,
  },
  {
    name: "Barraca",
    icon: "build",
    routerLink:"",
    expandable:true,
    level:0
  },
  {
      name: "Producto",
      icon: "computer",
      routerLink: "/admin/habilitar",
      expandable:false,
      level:1,
  },
  {
      name: "Detalle",
      icon: "important_devices",
      routerLink: "/admin/asignar",
      expandable:false,
      level:1,
  },
  {
      name: "Inventario",
      icon: "screen_share",
      routerLink: "/admin/auto",
      expandable:false,
      level:1,
  },
  // {
  //   name: "Reportes",
  //   icon: "pie_chart",
  //   routerLink:"",
  //   expandable:true,
  //   level:0
  // },
  // {
  //     name: "Colegios",
  //     icon: "school",
  //     routerLink: "/admin/reporte",
  //     expandable:false,
  //     level:1,
  // },
  // {
  //     name: "Ganadores",
  //     icon: "school",
  //     routerLink: "/admin/ganadores",
  //     expandable:false,
  //     level:1,
  // }  
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  icon:string;
  level: number;
  isExpanded?: boolean;
  routerLink:string;
}
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
    cerrar_sesion(){
      this.auth.logout();
      this.route.navigateByUrl('/home');
      this.toastr.warning('Finalizaste sesion','Atencion');
    }
    getrol(){
      try {
        const rol=localStorage.getItem('rol');
        if(rol==="1")
          return "Administrador";
        if(rol==="2")
          return "Usuario";
        if(rol==="3")
          return "Staff";
      } 
      catch (error) {    
      }
        return "";
    }
    nombre(){
      return localStorage.getItem('nombre');
    }
    imagen(){
      return localStorage.getItem('imagen');
    }
  constructor(private breakpointObserver: BreakpointObserver,private auth: AuthService , private toastr:ToastrService, private route:Router) {}
  ngOnInit(): void {
    
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

dataSource = new ArrayDataSource(TREE_DATA);

hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

getParentNode(node: ExampleFlatNode) {
  const nodeIndex = TREE_DATA.indexOf(node);

  for (let i = nodeIndex - 1; i >= 0; i--) {
    if (TREE_DATA[i].level === node.level - 1) {
      return TREE_DATA[i];
    }
  }

  return null;
}

shouldRender(node: ExampleFlatNode) {
  let parent = this.getParentNode(node);
  while (parent) {
    if (!parent.isExpanded) {
      return false;
    }
    parent = this.getParentNode(parent);
  }
  return true;
}
}