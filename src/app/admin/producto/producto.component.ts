import { Component,Inject, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/Producto.service';
import autoTable, { Row } from 'jspdf-autotable'
import { jsPDF } from "jspdf";
import { Formulario } from './formulario';
import { CrearProductoComponent } from './crear-Producto/crear-Producto.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoComponent } from './editar-Producto/editar-Producto.component';
import { VerProductoComponent } from './ver-Producto/ver-Producto.component';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-Producto',
  templateUrl: './Producto.component.html',
  styleUrls: ['./Producto.component.scss']
})
export class ProductoComponent implements OnInit {
  title = 'Producto';
  productos =[]; 
  base=environment.base+'producto/imagen/';

  llenar_imagen(img){    
    return this.base+img;
  }
  constructor(private producto:ProductoService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog) { 
  }
  ngOnInit(): void {
    this.producto.listar(1).subscribe((data:any)=>{
      this.productos=data;
      console.log(data);
    });
  }
  filterpost=[];
  public form={id:null,aula:null,maquinas:null,columnas:null,jefe_labo:null,imagen:null,created_at:null,updated_at:null};
  agregar() {
    let data: Formulario;
    const dialogo1 = this.dialog.open(CrearProductoComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
       this.nuevo(art.value);
       else
       this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  cambiar(lab) {
    const dialogo1 = this.dialog.open(EditarProductoComponent, {data:lab});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
        this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  ver_labo(lab) {
    const dialogo1 = this.dialog.open(VerProductoComponent, {data:lab});
  }
  nuevo(datos){
    let form=datos;
    let formulario:Formulario;
    formulario=new Formulario(0,form.nombre,form.img,1);
    console.log(formulario);
    
    this.producto.nuevo(formulario).subscribe((data:any)=>{
      console.log(data);
      
      this.productos=data;
      this.toastr.success("Producto Creado",'Exito!');
    },
    error=>{
      this.toastr.error("No se pudo agregar el Producto",'Error!');
      console.log(error.error);
    });
  }
  remove(id): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Producto?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.producto.remove(id).subscribe((data:any)=>{
          this.productos=data;
        });          
        this.toastr.success('Producto Eliminado','')
      } else {
        this.toastr.info('Operacion Cancelada','');
      }
    });
  }
  update(datos) {
    let form=datos;
    let formulario:Formulario;
    formulario=new Formulario(form.id,form.nombre,form.img,1);
    this.producto.update(formulario.id,formulario).subscribe((data:any)=>{
        this.toastr.success("Producto Actualizado",'Exito!');
        this.productos=data;
      });       
  }
  pdf(){
    let fecha=new Date();
    const titulo="Producto "+fecha;
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
    doc.text("ProductoS",240,110);
    doc.setFontSize(10);
    doc.setFont('helvetica','normal')
    var data=[]
    let i=1;
    let imagenes=[];
    for(let u of this.productos){
      let x=[];
      x.push(i++)
      x.push(u.aula)
      // x.push(this.role(u.rol))
      x.push(u.jefe_labo)
      x.push(u.maquinas)
      x.push(" ")
      imagenes.push(u.imagen)
      data.push(x)
    }
    let imag;
    let cabeza=['#','Aula','Jefe de Producto','#Maquinas','    Imagen    ']
    // autoTable(doc,{columns:cabeza,body:data,theme:'grid',pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
    autoTable(doc,{columns:cabeza,body:data,pageBreak:'auto',headStyles:{fillColor:[0,0,0],textColor:[255,255,255]},startY:180,
    didDrawCell: (data) => {
      data.row.height=50;
      if (data.section === 'body' && data.column.index === 4) {
        data.row.height=80;
        // data.cell.width=100;
        // console.log(data.cell.text)
          imag=this.producto.imagen()+imagenes[data.row.index];
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
