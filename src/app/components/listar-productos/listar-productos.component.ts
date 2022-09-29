import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  // listar productos 
  listProductos: Producto[] =[];

  constructor(private _productoService: ProductoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(data =>{
    this.toastr.error('El producto fué eliminado con EXITO!!', 'Producto Eliminado');
    this.obtenerProductos();
    } , error => {
      console.log("Se a producido un error al querer eliminar un producto...");
      console.log(error);    
      })
  }

}
