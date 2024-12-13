import { Router } from '@angular/router';
import { ProductoService } from './../../../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent implements OnInit {

  categorias:any = [];
  productoData = {
    nombre:'',
    codigo:'',
    descripcion:'',
    stock:'',
    urlimagen:'',
    precioCompra: 0,
    precioVenta:0,
    activo:true,
    categoria:{
      categoriaId:''
    }
  }

  constructor(
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    private productoService:ProductoService,
    private router:Router) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },(error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar los datos','error');
      }
    )
  }



  guardarCuestionario(){
    this.productoData.precioVenta = this.calcularValorDeseado();
    console.log(this.productoData);
    if(this.productoData.nombre.trim() == '' || this.productoData.nombre == null){
      this.snack.open('El título es requerido','',{
        duration:3000
      });
      return ;
    }

    if(this.productoData.codigo.trim() == '' || this.productoData.codigo== null){
      this.snack.open('El código es requerido','',{
        duration:3000
      });
      return ;
    }

    if(this.productoData.descripcion.trim() == '' || this.productoData.descripcion== null){
      this.snack.open('La descripción es requerida','',{
        duration:3000
      });
      return ;
    }

    if (!this.productoData.precioCompra || isNaN(this.productoData.precioCompra) || this.productoData.precioCompra <= 0) {
      this.snack.open('El precio de compra es requerido y debe ser un número positivo', '', {
        duration: 3000
      });
      return;
    }

    if(this.productoData.stock == '' || this.productoData.stock== null){
      this.snack.open('El stock es requerido','',{
        duration:3000
      });
      return ;
    }

    if(this.productoData.urlimagen.trim() == '' || this.productoData.urlimagen== null){
      this.snack.open('La URL de imagen del Producto es requerido','',{
        duration:3000
      });
      return ;
    }

    // Validar que se haya seleccionado una categoría
    if (!this.productoData.categoria || !this.productoData.categoria.categoriaId) {
      this.snack.open('La categoría es requerida', '', {
          duration: 3000
      });
      return;
  }



    this.productoService.agregarProductos(this.productoData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Producto guardado','El producto ha sido guardado con éxito','success');
        this.productoData = {
          nombre : '',
          codigo:'',
          stock : '',
          urlimagen:'',
          descripcion:'',
          precioCompra : 0,
          precioVenta : 0,
          activo:true,
          categoria:{
            categoriaId:''
          }
        }
        this.router.navigate(['/admin/productos']);
      },
      (error) => {
        Swal.fire('Error','Error al guardar el producto','error');
      }
    )
  }
  calcularValorDeseado() {
    const precioCompra: number = this.productoData.precioCompra;
    const precioCalculado = (((precioCompra * 1.18) * 3.8) / (1 - (30 / 100)));
    const precioFormateado = parseFloat(precioCalculado.toFixed(2));

    return precioFormateado;
  }

}

