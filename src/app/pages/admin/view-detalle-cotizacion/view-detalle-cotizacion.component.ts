import { Component, Inject, OnInit } from '@angular/core';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import  Swal  from 'sweetalert2';
import { ProductoService } from 'src/app/services/producto.service';
import { forkJoin } from 'rxjs';
import { DetalleCotizacionService } from 'src/app/services/detalle-cotizacion.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-detalle-cotizacion',
  templateUrl: './view-detalle-cotizacion.component.html',
  styleUrls: ['./view-detalle-cotizacion.component.css']
})
export class ViewDetalleCotizacionComponent implements OnInit {

  cotizacionId:any;
  cliente:any;
  detalle:any = [];
  displayedColumns: string[] = ['producto', 'cantidad', 'precioUnitario', 'subtotal','Acciones'];
  detalles: any[] = []; // Asumiendo que detalle es tu array de objetos con los detalles
  totalAPagar: number = 0; // Variable para almacenar el total a pagar
  cotizacion:any;
  cantidadTotal:number=0;
  cantidadPorProducto: { [key: number]: number } = {};
  productos:any[]=[];

  constructor(private detalleService:DetalleCotizacionService, private modalService:ModalService,
    private route:ActivatedRoute,private cotizacionService:CotizacionService,private router:Router,
     private productoService:ProductoService,@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.cotizacionId = this.data.cotizacionId;
    this.cliente = this.route.snapshot.params['cliente'];
    this.detalleService.listarDetalleCotizacion(this.cotizacionId).subscribe(
      (data:any) => {
        console.log(data);
        this.detalle = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.cotizacionService.obtenerCotizacion(this.cotizacionId).subscribe(
      (data) => {
        this.cotizacion = data;
        console.log(this.cotizacion);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  cargarDetalles(): void {
    this.detalleService.listarDetalleCotizacion(this.cotizacionId).subscribe(
      (data:any) => {
        console.log(data);
        this.detalle = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  abrirModal(): void {
    this.cotizacionId = this.data.cotizacionId;
    this.modalService.openCotizacionModal(this.cotizacionId).subscribe(result => {
      if (result === 'actualizar') {
        this.cargarDetalles();  // Recarga la tabla si el modal ha sido guardado o actualizado
      }
    });
  }



  CloseModal(): void {
    this.modalService.cerrarViewDetalleCotizacion();
  }

  async procesarDetalle() {
    try {
      // Calcular el total de los subtotales
      this.totalAPagar = 0;
      this.cantidadTotal = 0;

      this.detalle.forEach((detalles: any) => {
        this.totalAPagar += Number(detalles.subtotal);
      });

      this.cotizacion.subTotalCotizacion = this.totalAPagar.toFixed(2);

      this.detalle.forEach((detalles: any) => {
        this.cantidadTotal += Number(detalles.cantidad);
      });

      this.cotizacion.numTotaldeDetalle = this.cantidadTotal;
      this.cotizacion.estadoCotizacion = "FALTAPROCESAR";

      // Calcular las cantidades por producto
      this.calcularCantidadPorProducto();

      // Obtener productos necesarios y esperar a que se completen
      await this.obtenerProductosNecesarios();

      // Llamar al servicio para actualizar la cotización
      this.cotizacionService.actualizarCotizacion(this.cotizacion).subscribe(
        (data) => {
          Swal.fire('Cotización actualizada', 'La cotización ha sido actualizada con éxito', 'success').then(() => {

            this.CloseModal();
             window.location.reload();
          });
        },
        (error) => {
          Swal.fire('Error en el sistema', 'No se ha podido actualizar la cotización', 'error');
          console.error('Error al actualizar cotización:', error);
        }
      );

      console.log('Total a pagar:', this.totalAPagar); // Solo para propósitos de demostración
    } catch (error) {
      console.error('Error en el procesamiento del detalle:', error);
      Swal.fire('Error', 'Ocurrió un error durante el procesamiento del detalle', 'error');
    }
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
          resolve(); // Resolver la promesa cuando se obtienen los productos
        },
        (error) => {
          console.error('Error al obtener productos:', error);
          reject(error); // Rechazar la promesa en caso de error
        }
      );
    });
  }



  eliminarDetalle(detalleCotizacionId: any) {
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
        this.detalleService.eliminarDetalle(detalleCotizacionId).subscribe(
          (data) => {
            this.detalle = this.detalle.filter((detalles: any) => detalles.detalleId != detalleCotizacionId);
            this.detalle = this.detalle.filter((detalles: any) => detalles.detalleCotizacionId !== detalleCotizacionId);
            Swal.fire('Detalle eliminado', 'El detalle ha sido eliminado de la base de datos', 'success')
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el detalle', 'error');
          }
        );
      }

    });
  }

}
