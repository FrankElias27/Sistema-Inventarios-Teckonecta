import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { ProductoService } from './../../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private productoService:ProductoService,
    private categoriaService:CategoriaService,
    private router:Router) { }

  productoId = 0;
  producto:any;
  categorias:any;

  ngOnInit(): void {
    this.productoId = this.route.snapshot.params['productoId'];
    this.productoService.obtenerProductos(this.productoId).subscribe(
      (data) => {
        this.producto = data;
        console.log(this.producto);
      },
      (error) => {
        console.log(error);
      }
    )

    this.categoriaService.listarCategorias().subscribe(
      (data:any) => {
        this.categorias = data;
      },
      (error) => {
        alert('Error al cargar las categorías');
      }
    )
  }

  public actualizarDatos(){
    this.productoService.actualizarProductos(this.producto).subscribe(
      (data) => {
        Swal.fire('producto actualizado','El producto ha sido actualizado con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/productos']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar el proucto','error');
        console.log(error);
      }
    )
  }
  calcularValorDeseado() {
    const precioCompra: number = this.producto.precioCompra;
    const precioCalculado = (((precioCompra * 1.18) * 3.8) / (1 - (30 / 100)));
    const precioFormateado = parseFloat(precioCalculado.toFixed(2));
  
    return precioFormateado;
  }
}

