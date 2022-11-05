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
    name: "Competencia",
    icon: "new_releases",
    routerLink:"",
    expandable:true,
    level:0
  },
  {
      name: "Problema",
      icon: "book",
      routerLink: "/logistica/problema",
      expandable:false,
      level:1,
  },
  {
      name: "Equipo",
      icon: "group_work",
      routerLink: "/logistica/equipo",
      expandable:false,
      level:1,
  },
  {
      name: "Maquinas",
      icon: "computer",
      routerLink: "/logistica/habilitar",
      expandable:false,
      level:1,
  },
  {
      name: "Asignar",
      icon: "important_devices",
      routerLink: "/logistica/asignar",
      expandable:false,
      level:1,
  },
  {
    name: "Score",
    icon: "leaderboard",
    routerLink: "/logistica/score",
    expandable:false,
    level:1,
},  
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
      const rol=localStorage.getItem('rol');
      if(rol==="1")
        return "Administrador";
      if(rol==="2")
        return "Logistica";
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