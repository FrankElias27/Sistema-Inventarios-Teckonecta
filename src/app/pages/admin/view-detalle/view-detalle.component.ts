import { Component, OnInit } from '@angular/core';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import  Swal  from 'sweetalert2';
import { ProductoService } from 'src/app/services/producto.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-view-detalle',
  templateUrl: './view-detalle.component.html',
  styleUrls: ['./view-detalle.component.css']
})
export class ViewDetalleComponent implements OnInit {
  ventaId:any;
  cliente:any;
  detalle:any = [];
  displayedColumns: string[] = ['producto', 'cantidad', 'precioUnitario', 'subtotal','Acciones'];
  detalles: any[] = []; // Asumiendo que detalle es tu array de objetos con los detalles
  totalAPagar: number = 0; // Variable para almacenar el total a pagar
  venta:any;
  cantidadTotal:number=0;
  cantidadPorProducto: { [key: number]: number } = {};
  productos:any[]=[];


  constructor(private detalleService:DetalleVentaService, private modalService:ModalService,
    private route:ActivatedRoute,private ventasService:VentaService,private router:Router, private productoService:ProductoService) { }

  ngOnInit(): void {
    this.ventaId = this.route.snapshot.params['ventaId'];
    this.cliente = this.route.snapshot.params['cliente'];
    this.detalleService.listarDetalleVenta(this.ventaId).subscribe(
      (data:any) => {
        console.log(data);
        this.detalle = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.ventasService.obtenerVenta(this.ventaId).subscribe(
      (data) => {
        this.venta = data;
        console.log(this.venta);
      },
      (error) => {
        console.log(error);
      }
    )

  }

  abrirModal(): void {
    this.ventaId = this.route.snapshot.params['ventaId'];
    this.modalService.openVentaModal(this.ventaId);
  }

  procesarDetalle() {
    // Calcular el total de los subtotales
    this.totalAPagar = 0;
    this.cantidadTotal = 0;

    this.detalle.forEach((detalles: any) => {
      this.totalAPagar += Number(detalles.subtotal);
    });

    this.venta.totalaPagar = this.totalAPagar.toFixed(2);

    this.detalle.forEach((detalles: any) => {
      this.cantidadTotal += Number(detalles.cantidad);
    });

    this.venta.numTotaldeDetalleVenta = this.cantidadTotal;

    this.venta.estado="PROCESADO";

    this.calcularCantidadPorProducto();

    // Llamar a obtener productos necesarios y esperar a que termine
    this.obtenerProductosNecesarios()
      .then(() => {
        // Llamar al servicio para actualizar ventas
        return this.ventasService.actualizarVentas(this.venta).toPromise();
      })
      .then((data) => {
        Swal.fire('Venta actualizada', 'La venta ha sido actualizada con éxito', 'success').then(() => {
          console.log('Venta actualizada con éxito:', data);
          this.router.navigate(['/admin/ventas']);
        });
      })
      .catch((error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar la venta', 'error');
        console.error('Error al actualizar venta:', error);
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
          // Obtener el producto con el productoId actual
          const observable = this.productoService.obtenerProductos(productoId);
          observables.push(observable);
        }
      }

      // Esperar a que todos los observables se completen usando forkJoin
      forkJoin(observables).subscribe(
        (productos: any[]) => {
          this.productos = productos;
          console.log('Productos obtenidos:', this.productos);

          this.restarCantidades();
          resolve(); // Resuelve la promesa cuando las cantidades se restan
        },
        (error) => {
          reject(error); // Rechaza la promesa si hay un error
        }
      );
    });
  }

  restarCantidades() {
    const observables = [];

    for (const productoId in this.cantidadPorProducto) {
      if (this.cantidadPorProducto.hasOwnProperty(productoId)) {
        const cantidadRestar = this.cantidadPorProducto[productoId];

        // Encontrar el producto correspondiente en this.productos basado en productoId
        const productoIndex = this.productos.findIndex(p => p.productoId === parseInt(productoId));

        if (productoIndex !== -1) {
          // Restar la cantidad al stockActual del producto encontrado
          this.productos[productoIndex].stock -= cantidadRestar;

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

  eliminarDetalle(detalleVentaId: any) {
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
        this.detalleService.eliminarDetalle(detalleVentaId).subscribe(
          (data) => {
            this.detalle = this.detalle.filter((detalles: any) => detalles.detalleId != detalleVentaId);
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
