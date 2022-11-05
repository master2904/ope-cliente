import { NgModule } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { LaboratorioComponent } from './laboratorio/laboratorio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EquipoComponent } from './equipo/equipo.component';
import { ConcursoComponent } from './concurso/concurso.component';
import { ProblemaComponent } from './problema/problema.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { FilterUPipe } from './pipes/filter-u.pipe';
import { FilterLPipe } from './pipes/filter-l.pipe';
import { FilterPPipe } from './pipes/filter-p.pipe';
import { FilterEPipe } from './pipes/filter-e.pipe';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PerfilComponent } from './perfil/perfil.component';
import { ScriptComponent } from './script/script.component';
import { AsignarComponent } from './asignar/asignar.component';
import { ScoreComponent } from './score/score.component';
import { PipeScorePipe } from './pipes/pipe-score.pipe';
import {MatCardModule} from '@angular/material/card';
import {CdkTreeModule} from '@angular/cdk/tree';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { EditarLaboratorioComponent } from './laboratorio/editar-laboratorio/editar-laboratorio.component';
import { CrearLaboratorioComponent } from './laboratorio/crear-laboratorio/crear-laboratorio.component';
import { EditarConsursoComponent } from './concurso/editar-consurso/editar-consurso.component';
import { CrearConsursoComponent } from './concurso/crear-consurso/crear-consurso.component';
import { CrearEquipoComponent } from './equipo/crear-equipo/crear-equipo.component';
import { EditarEquipoComponent } from './equipo/editar-equipo/editar-equipo.component';
import { CrearProblemaComponent } from './problema/crear-problema/crear-problema.component';
import { EditarProblemaComponent } from './problema/editar-problema/editar-problema.component';
import { RegistrarSolucionComponent } from './score/registrar-solucion/registrar-solucion.component';
import { VerLaboratorioComponent } from './laboratorio/ver-laboratorio/ver-laboratorio.component';
import { FilterConcursoPipe } from './pipes/filter-concurso.pipe';
import { ImportarComponent } from './importar/importar.component';
import { ColegioComponent } from './colegio/colegio.component';
import { CrearColegioComponent } from './colegio/crear-colegio/crear-colegio.component';
import { EditarColegioComponent } from './colegio/editar-colegio/editar-colegio.component';
import { FilterColegioPipe } from './pipes/filter-colegio.pipe';
import { HabilitarComponent } from './habilitar/habilitar.component';
import { RegistrarEquipoComponent } from './asignar/registrar-equipo/registrar-equipo.component';
import { VerMaquinaComponent } from './asignar/ver-maquina/ver-maquina.component';
import {MatMenuModule} from '@angular/material/menu';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from './staff-routing.module';
// import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    LaboratorioComponent, 
    UsuarioComponent, 
    EquipoComponent, 
    ConcursoComponent, 
    ProblemaComponent, 
    HomeComponent, 
    StaffComponent,
    FilterUPipe, 
    FilterLPipe, 
    FilterPPipe, 
    FilterEPipe,
    MenuComponent,
    PerfilComponent, 
    ScriptComponent, 
    AsignarComponent, 
    ScoreComponent, 
    PipeScorePipe, 
    CrearUsuarioComponent, 
    EditarUsuarioComponent, 
    EditarLaboratorioComponent, 
    CrearLaboratorioComponent, 
    EditarConsursoComponent, 
    CrearConsursoComponent, 
    CrearEquipoComponent, 
    EditarEquipoComponent, 
    CrearProblemaComponent, 
    EditarProblemaComponent, 
    RegistrarSolucionComponent, 
    VerLaboratorioComponent, 
    FilterConcursoPipe, ImportarComponent, ColegioComponent, CrearColegioComponent, EditarColegioComponent, FilterColegioPipe, HabilitarComponent, RegistrarEquipoComponent, VerMaquinaComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
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
    MatSelectModule,
    MatCardModule,
    CdkTreeModule,
    MatDatepickerModule,
    MatMenuModule
],
  exports:[
    StaffComponent
  ],
  entryComponents: []
})
export class StaffModule { }