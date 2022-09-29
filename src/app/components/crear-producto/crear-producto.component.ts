import { PropertyRead } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})


export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = "Crear producto";
  id: string | null;
  
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _productoService: ProductoService,
              private aRoute: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    }) 
    this.id = this.aRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
       
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if(this.id !== null){
      //editamos prodcuto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info("Editando el producto con EXITO!",  "Producto Actualizado!");
        this.router.navigate(['/']);
      }, error => {
        console.log("ERROR al Actualizar un Producto !!!");
        console.log(error);
        this.productoForm.reset();
      })

    } else {
      //agregamos el producto
      //console.log(PRODUCTO);
      this._productoService.crearProducto(PRODUCTO).subscribe(data => {
        this.toastr.success("El producto fue agregado a la base con EXITO!",  "Producto Registrado!");
        this.router.navigate(['/']);
      }, error => {
        console.log("ERROR al CREAR y REGISTRAR un Producto !!!");
        console.log(error);
        this.productoForm.reset();
      })
    
    }
   // this.toastr.success('El producto fué registrado con EXITO!!', 'Registro de Productos');
   // this.router.navigate(['/'])
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = "Editar Producto";
      this. _productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
      })
    }
  }

}
