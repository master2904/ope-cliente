import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { UsuarioService } from '../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import autoTable, { Row } from 'jspdf-autotable'
import { jsPDF } from "jspdf";
import { isUndefined } from 'util';
import { Formulario } from './formulario';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',

  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  title = 'Usuarios';
  usuarios =[]; 
  base=environment.base+'usuario/imagen/';
  llenar_imagen(img){    
    // return this.base+img;
    let iu;
    return this.base+img;
    this.usuario.cargar(img).subscribe((data:any)=>{
      iu=data;
      console.log(data);
    });
    return iu;
  }
  abrirDialogo() {
    let data: Formulario;
    const dialogo1 = this.dialog.open(CrearUsuarioComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
      this.nuevo(art.value);
    }
    );
  }
  actualizar(f:Formulario) {
    const dialogo1 = this.dialog.open(EditarUsuarioComponent, {data:f});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
      this.update(art.value);
    }
    );
  }
  nuevo(datos){
    let form=datos;
    let formulario:Formulario;
    formulario=new Formulario(0,form.nombre,form.apellido,form.username,form.rol,form.img,form.email,form.password);
    this.usuario.nuevo(formulario).subscribe((data:any)=>{
      this.usuarios=data;
      this.toastr.success("Usuario Creado",'Exito!');
    },
    error=>{
      this.toastr.error("Esta cuenta ya existe",'Error!');
      console.log(error.error.error);
    });
  }
  filterpost='';
  ide=null;
  role(rol){
    switch(rol){
      case 1:
        return "Administrador";
      case 2:
        return "Logística";
      case 3:
        return "Staff";
      default:
        return "";
    }
  }
      constructor(private usuario:UsuarioService, private route:Router,private toastr: ToastrService,private dialog:MatDialog) {
      }
      ngOnInit(): void {
        this.usuario.listar().subscribe((data:any)=>{
          // console.log(data);
          this.usuarios=data;
          // this.settear();
      });
    }
    nombre_i=null;
    file:File=null;
    remove(id){
      console.log(id);
      this.usuario.eliminar(id).subscribe((data:any)=>{
        console.log(data);
        this.usuarios=data;
      });
      this.toastr.success("Usuario Eliminado",'Exito!')      
    }
    update(datos) {
      let form=datos;
      let formulario:Formulario;
      formulario=new Formulario(form.id,form.nombre,form.apellido,form.username,form.rol,form.img,form.email,form.password);
      console.log(formulario)
      this.usuario.update(formulario.id,formulario).subscribe((data:any) => {
        this.toastr.success("Usuario Actualizado",'Exito!');
        this.usuarios=data;
      },
      error=>{
          this.toastr.error("No se pudo actualizar",'Error!');
          console.log(error.error.error);
      });  
    }
    pdf(){
      let fecha=new Date();
      const titulo="usuarios "+fecha;
      const doc = new jsPDF('p', 'pt', 'a4');
      const imagen= new Image();
      imagen.src="assets/images/FNI.png";
      doc.addImage(imagen,"png",480,30,60,60);
      imagen.src="assets/images/uto.png";
      doc.addImage(imagen,"png",40,30,60,60);
      imagen.src="assets/images/sis_inf.png";
      doc.addImage(imagen,"png",40,130,515,40);
      doc.setFontSize(9);
      doc.setFont('helvetica','bold')
      doc.text("UNIVERSIDAD TECNICA DE ORURO",230,45);
      doc.text("FACULTAD NACIONAL DE INGENIERIA",220,57);
      doc.text("INGENIERIA DE SISTEMAS E INGENIERIA INFORMATICA",190,69);
      doc.setFontSize(20);
      doc.text("USUARIOS",240,110);
      doc.setFontSize(10);
      doc.setFont('helvetica','normal')
      var data=[]
      let i=1;
      let imagenes=[];
      for(let u of this.usuarios){
        let x=[];
        x.push(i++)
        x.push(u.apellido+" "+u.nombre)
        x.push(this.role(u.rol))
        x.push(u.email)
        x.push(u.username)
        x.push(" ")
        imagenes.push(u.imagen)
        data.push(x)
      }
      let imag;
      let cabeza=['#','Nombre Completo','Rol','Correo','Cuenta','    Imagen    ']
      // autoTable(doc,{columns:cabeza,body:data,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
      autoTable(doc,{columns:cabeza,body:data,pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
      didDrawCell: (data) => {
        data.row.height=50;
        if (data.section === 'body' && data.column.index === 5) {
          data.row.height=80;
          // data.cell.width=100;
          // console.log(data.cell.text)
            imag=this.base+imagenes[data.row.index];
            // imag=this.base+data.cell.text;
            // imag=this.base+'202185131519.jpg';
          // doc.addImage(imag,"jpeg",10,10,60,60);
          // var base64Img = 'data:image/jpeg;base64,iVBORw0KGgoAAAANS...'
            doc.addImage(imag, 'JPEG', data.cell.x + 2, data.cell.y -20, 65, 65)
          }
        }
      })
      addFooters(doc)
      doc.save(titulo+'.pdf')
  }
}
  const addFooters = doc => {
    const pageCount = doc.internal.getNumberOfPages()
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text('Usuario: ' + localStorage.getItem('nombre')+" "+localStorage.getItem('apellido'), 40, doc.internal.pageSize.height-10, {align:'left'})
      doc.text('Página ' + String(i) + ' de ' + String(pageCount), 550, doc.internal.pageSize.height-10, {align:'right'})
    }
  }

