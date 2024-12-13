import { Component, OnInit } from '@angular/core';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import  Swal  from 'sweetalert2';
import { ProductoService } from 'src/app/services/producto.service';
import { forkJoin } from 'rxjs';
import { ComprasService } from 'src/app/services/compras.service';
import { DetalleCompraService } from 'src/app/services/detalle-compra.service';

@Component({
  selector: 'app-view-detalle-compras',
  templateUrl: './view-detalle-compras.component.html',
  styleUrls: ['./view-detalle-compras.component.css']
})
export class ViewDetalleComprasComponent implements OnInit {
  compraId:any;
  proveedor:any;
  detalle:any = [];
  displayedColumns: string[] = ['producto', 'cantidad', 'precioUnitario', 'subtotal','Acciones'];
  detalles: any[] = []; // Asumiendo que detalle es tu array de objetos con los detalles
  totalAPagar: number = 0; // Variable para almacenar el total a pagar
  compra:any;
  cantidadTotal:number=0;
  cantidadPorProducto: { [key: number]: number } = {};
  productos:any[]=[];

  constructor( private modalService:ModalService,private detalleService:DetalleCompraService,
    private route:ActivatedRoute,private comprasService:ComprasService,private router:Router, private productoService:ProductoService) { }

  ngOnInit(): void {
    this.compraId = this.route.snapshot.params['compraId'];
    this.proveedor = this.route.snapshot.params['proveedor'];
    this.detalleService.listarDetalleCompra(this.compraId).subscribe(
      (data:any) => {
        console.log(data);
        this.detalle = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.comprasService.obtenerCompra(this.compraId).subscribe(
      (data) => {
        this.compra = data;
        console.log(this.compra);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  abrirModal(): void {
    this.compraId = this.route.snapshot.params['compraId'];
    this.modalService.openCompraModal(this.compraId);
  }

  procesarDetalle() {
    // Calcular el total de los subtotales
    this.totalAPagar = 0;
    this.cantidadTotal = 0;
  
    this.detalle.forEach((detalles: any) => {
      this.totalAPagar += Number(detalles.subtotal);
    });
  
    this.compra.totalaPagar = this.totalAPagar.toFixed(2);
  
    this.detalle.forEach((detalles: any) => {
      this.cantidadTotal += Number(detalles.cantidad);
    });
  
    this.compra.numTotaldeProductos = this.cantidadTotal;

    this.compra.estado="PROCESADO";
  
    this.calcularCantidadPorProducto();
  
    this.obtenerProductosNecesarios().then(() => {
      // Llamar al servicio para actualizar ventas después de obtener productos y actualizar stocks
      this.comprasService.actualizarCompras(this.compra).subscribe(
        (data) => {
          Swal.fire('Compra actualizada', 'La compra ha sido actualizada con éxito', 'success').then(() => {
            console.log('Compra actualizada con éxito:', data);
            this.router.navigate(['/admin/compras']);
          });
        },
        (error) => {
          Swal.fire('Error en el sistema', 'No se ha podido actualizar la compra', 'error');
          console.error('Error al actualizar compra:', error);
        }
      );
    }).catch((error) => {
      Swal.fire('Error en la obtención de productos', 'No se pudieron obtener los productos', 'error');
      console.error('Error al obtener productos:', error);
    });
  
    console.log('Total a pagar:', this.totalAPagar); // Solo para propósitos de demostración
  }

  calcularCantidadPorProducto() {
    this.detalle.forEach((detalle: any) => {
      const productoId = detalle.producto.productoId;
      const cantidad = Number(detalle.cantidad); // Convertir a número

      if (!isNaN(cantidad)) { // Verificar que sea un número válido
        if (this.cantidadPorProducto[productoId]) {
          this.cantidadPorProducto[productoId] += cantidad;
        } else {
          this.cantidadPorProducto[productoId] = cantidad;
        }
      }
    });

    console.log('Cantidad por producto:', this.cantidadPorProducto);
  }

  obtenerProductosNecesarios(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Crear un arreglo de observables para obtener los productos
      const observables = [];
  
      for (const productoId in this.cantidadPorProducto) {
        if (this.cantidadPorProducto.hasOwnProperty(productoId)) {
          const observable = this.productoService.obtenerProductos(productoId);
          observables.push(observable);
        }
      }
  
      // Esperar a que todos los observables se completen usando forkJoin
      forkJoin(observables).subscribe(
        (productos: any[]) => {
          this.productos = productos;
          console.log('Productos obtenidos:', this.productos);
  
          this.SumarCantidades();
          resolve(); // Resuelve la promesa cuando las cantidades se suman
        },
        (error) => {
          reject(error); // Rechaza la promesa si hay un error
        }
      );
    });
  }

  SumarCantidades() {
    const observables = [];
  
    for (const productoId in this.cantidadPorProducto) {
      if (this.cantidadPorProducto.hasOwnProperty(productoId)) {
        const cantidadSumar = this.cantidadPorProducto[productoId];
  
        // Encontrar el producto correspondiente en this.productos basado en productoId
        const productoIndex = this.productos.findIndex(p => p.productoId === parseInt(productoId));
  
        if (productoIndex !== -1) {
          // Sumar la cantidad al stockActual del producto encontrado
          this.productos[productoIndex].stock += cantidadSumar;
  
          // Agregar el observable de actualización del producto al arreglo
          observables.push(this.productoService.actualizarProductos(this.productos[productoIndex]));
        } else {
          console.warn(`No se encontró el producto con productoId ${productoId}`);
        }
      }
    }
  
    // Ejecutar las actualizaciones secuencialmente usando forkJoin
    return forkJoin(observables).toPromise(); // Asegurarse de devolver una promesa
  }

  eliminarDetalle(detalleCompraId: any) {
    Swal.fire({
      title: 'Eliminar detalle',
      text: '¿Estás seguro de eliminar el detalle?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detalleService.eliminarDetalle(detalleCompraId).subscribe(
          (data) => {
            this.detalle = this.detalle.filter((detalles: any) => detalles.detalleId != detalleCompraId);
            Swal.fire('Detalle eliminado', 'El detalle ha sido eliminado de la base de datos', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el detalle', 'error');
          }
        );
      }

    });
  }

}
