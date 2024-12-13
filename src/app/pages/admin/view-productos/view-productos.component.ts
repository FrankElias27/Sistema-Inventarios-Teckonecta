import Swal from 'sweetalert2';
import { ProductoService } from './../../../services/producto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-productos',
  templateUrl: './view-productos.component.html',
  styleUrls: ['./view-productos.component.css']
})
export class ViewProductosComponent implements OnInit {

  productos: any[] = [];
  currentPage: number = 0;
  pageSize: number = 4; // Tamaño de página

  nombreBuscar: string = '';
  productosPage: any;
  displayedColumns: string[] = ['Nombre', 'Categoría', 'stock','Nivel', 'Precio Compra','Precio Venta','Precio Cotizacion','Acciones'];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductos(this.currentPage);
  }

  getProductos(page: number): void {
    this.productoService.getProductos(page)
      .subscribe(
        response => {
          this.productos = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
        },
        error => {
          console.error('Error al obtener productos', error);
        }
      );
  }

  nextPage(): void {
    this.getProductos(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getProductos(this.currentPage - 1);
    }
  }

  buscarProductos() {
    this.productoService.buscarProductosPorNombre<any>(this.nombreBuscar, 0, this.pageSize) // Empieza desde la primera página al buscar
      .subscribe((data: any) => {
        this.productos = data.content; // Actualiza la lista de productos con los resultados de búsqueda
        this.currentPage = data.number; // Actualiza la página actual después de la búsqueda
      });
  }

  eliminarProducto(productosId: any) {
    Swal.fire({
      title: 'Eliminar producto',
      text: '¿Estás seguro de eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProductos(productosId).subscribe(
          (data) => {
            this.productos = this.productos.filter((producto: any) => producto.productosId != productosId);
            Swal.fire('Producto eliminado', 'El producto ha sido eliminado de la base de datos', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el producto', 'error');
          }
        );
      }

    });
  }
}