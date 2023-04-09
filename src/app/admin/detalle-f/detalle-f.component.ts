import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogoComponent } from 'src/app/dialogo/dialogo.component';
import { DetalleService } from 'src/app/services/detalle.service';
import { ProductoService } from 'src/app/services/Producto.service';
import { environment } from 'src/environments/environment.prod';
import { CrearDetalleComponent } from './crear-detalle/crear-detalle.component';
import { EditarDetalleComponent } from './editar-detalle/editar-detalle.component';
import { Formulario } from './formulario';
import { TipoService } from 'src/app/services/tipo.service';

@Component({
  selector: 'app-detalle-f',
  templateUrl: './detalle-f.component.html',
  styleUrls: ['./detalle-f.component.scss']
})
export class DetalleFComponent implements OnInit {
  title = 'Producto';
  f_productos ={id:null,nombre:null,imagen:null}; 
  f_tipos ={id:null,id_producto:null,descripcion:null}; 
  productos =[];
  tipos =[];
  detalles=[];
  base=environment.base+'producto/imagen/';

  llenar_imagen(img){    
    return this.base+img;
  }
  constructor(private producto:ProductoService, private route:Router,private toastr: ToastrService,private dialog:MatDialog,private dialogo:MatDialog,private detalle:DetalleService,private tipo:TipoService) { 
  }
  ngOnInit(): void {
    this.producto.listar(1).subscribe((data:any)=>{
      this.productos=data;
      console.log(this.productos);
    });
  }
  flat=false;
  flat2=false;
  alerta(a,b){
    return a<=b;
  }
  id_t:0;
  mostrar_tipo(p){
    this.flat=true;
    this.producto.buscar(p.id).subscribe((data:any)=>{
      this.f_productos=data;
    });
    this.tipo.listar(p.id).subscribe((data:any)=>{
      this.tipos=data;
      console.log(this.tipos)
    }); 
  }
  mostrar_detalle(t){
    this.flat2=true;
    this.id_t=t.id;
    this.f_tipos=t;
    console.log(t)
    this.detalle.listar(t.id).subscribe((data:any)=>{
      this.detalles=data;
      console.log(this.detalles)
    }); 
  }
  filterpost=[];
  public form={id:null,codigo:null,id_tipo:null,descripcion:null,cantidad:null,precio_compra:null,precio_venta:null,stock_minimo:null,created_at:null,updated_at:null};
  agregar() {
    let data: Formulario;
    const dialogo1 = this.dialog.open(CrearDetalleComponent, {data});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
       this.nuevo(art.value);
       else
       this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  cambiar(lab) {
    const dialogo1 = this.dialog.open(EditarDetalleComponent, {data:lab});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.update(art.value);
      else
        this.toastr.info('Operacion Cancelada','');
    }
    );
  }
  nuevo(datos){
    let form=datos;
    let formulario:Formulario;

    formulario=new Formulario(0,form.codigo,this.id_t,form.descripcion,form.cantidad,form.precio_compra,form.precio_venta,form.stock_minimo);
    // console.log(formulario);
    
    this.detalle.nuevo(formulario).subscribe((data:any)=>{
      // console.log(data);
      this.detalles=data;
      this.toastr.success("Item Agregado",'Exito!');
    },
    error=>{
      this.toastr.error("No se pudo agregar el Item",'Error!');
      // console.log(error.error);
    });
  }
  remove(id): void {
    this.dialogo.open(DialogoComponent, {
      data: `¿Desea Eliminar este Producto?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.detalle.remove(id).subscribe((data:any)=>{
          this.detalles=data;
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
    formulario=new Formulario(form.id,form.codigo,form.id_tipo,form.descripcion,form.cantidad,form.precio_compra,form.precio_venta,form.stock_minimo);
    this.detalle.update(formulario.id,formulario).subscribe((data:any)=>{
        this.toastr.success("Item Actualizado",'Exito!');
        this.detalles=data;
      });       
  }


}
