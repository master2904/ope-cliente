import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaboratorioComponent } from './laboratorio/laboratorio.component';
import { ConcursoComponent } from './concurso/concurso.component';
import { EquipoComponent } from './equipo/equipo.component';
import { ProblemaComponent } from './problema/problema.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component'; 
import { ScriptComponent } from './script/script.component';
import { AsignarComponent } from './asignar/asignar.component';
import { ScoreComponent } from './score/score.component';
import { StaffComponent } from './staff.component';  
import { ImportarComponent } from './importar/importar.component';
import { ColegioComponent } from './colegio/colegio.component';
import { HabilitarComponent } from './habilitar/habilitar.component';

const routes: Routes = [
  {

    path:'',
    component:StaffComponent,
    children:[
      {path:'asignar',component:AsignarComponent},
      {path:'habilitar',component:HabilitarComponent},
      {path:'home',component:HomeComponent},
      {path:'concurso',component: ConcursoComponent},
      {path:'colegio',component: ColegioComponent},
      {path:'equipo',component: EquipoComponent},
      {path:'laboratorio',component: LaboratorioComponent},
      {path:'problema',component: ProblemaComponent},
      {path:'usuario',component: UsuarioComponent},
      {path:'perfil',component: PerfilComponent},
      {path:'script',component: ScriptComponent},
      {path:'score',component: ScoreComponent},
      {path:'importar',component: ImportarComponent},
      {path:'**',redirectTo:'home'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
