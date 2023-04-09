import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConcursoComponent } from './concurso/concurso.component';
import { EquipoComponent } from './equipo/equipo.component';
import { ProblemaComponent } from './problema/problema.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component'; 
import { ScriptComponent } from './script/script.component';
import { AsignarComponent } from './asignar/asignar.component';
import { ScoreComponent } from './score/score.component';
import { AdminComponent } from './admin.component';
import { ImportarComponent } from './importar/importar.component';
import { HabilitarComponent } from './habilitar/habilitar.component';
import { AutoComponent } from './auto/auto.component';
import { ReporteComponent } from './reporte/reporte.component';
import { GanadoresComponent } from './ganadores/ganadores.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleBComponent } from './detalle-b/detalle-b.component';
import { DetalleFComponent } from './detalle-f/detalle-f.component';
import { TipoFComponent } from './tipo-f/tipo-f.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { InventarioComponent } from './inventario/inventario.component';
import { VentafComponent } from './ventaf/ventaf.component';



const routes: Routes = [
  {

    path:'',
    component:AdminComponent,
    children:[
      {path:'asignar',component:AsignarComponent},
      {path:'habilitar',component:HabilitarComponent},
      {path:'home',component:HomeComponent},
      {path:'producto',component: ProductoComponent},
      {path:'tipof',component: TipoFComponent},
      {path:'detalle',component: DetalleFComponent},
      {path:'detalles',component: DetalleBComponent},
      {path:'usuario',component: UsuarioComponent},
      {path:'perfil',component: PerfilComponent},
      {path:'reporte',component: ReporteComponent},
      {path:'cliente',component: ClienteComponent},
      {path:'proveedor',component: ProveedorComponent},
      {path:'inventario',component: InventarioComponent},
      {path:'ventaf',component: VentafComponent},
      {path:'**',redirectTo:'home'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
