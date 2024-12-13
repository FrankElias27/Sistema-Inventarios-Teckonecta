import { Component, OnInit } from '@angular/core';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import  Swal  from 'sweetalert2';
import { ProductoService } from 'src/app/services/producto.service';
import { forkJoin } from 'rxjs';
import { DetalleCotizacionService } from 'src/app/services/detalle-cotizacion.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { DetalleServicioService } from 'src/app/services/detalle-servicio.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-view-detalle-servicio',
  templateUrl: './view-detalle-servicio.component.html',
  styleUrls: ['./view-detalle-servicio.component.css']
})
export class ViewDetalleServicioComponent implements OnInit {

  cotizacionId:any;
  cliente:any;
  detalle:any = [];
  displayedColumns: string[] = ['servicio','Acciones'];
  detalles: any[] = []; // Asumiendo que detalle es tu array de objetos con los detalles
  SumaDeSubTotales: number = 0; // Variable para almacenar el total a pagar
  SubTotal:number =0;
  cotizacion:any;
  cantidadTotal:number=0;
  cantidadPorProducto: { [key: number]: number } = {};
  productos:any[]=[];

  constructor(private detalleService:DetalleServicioService, private modalService:ModalService,
    private route:ActivatedRoute,private cotizacionService:CotizacionService,private router:Router, private servicioService:ServicioService) { }

  ngOnInit(): void {
    this.cotizacionId = this.route.snapshot.params['cotizacionId'];
    this.cliente = this.route.snapshot.params['cliente'];
    this.detalleService.listarDetalleServicio(this.cotizacionId).subscribe(
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

  abrirModal(): void {
    this.cotizacionId = this.route.snapshot.params['cotizacionId'];
    this.modalService.openNuevoServicioModal(this.cotizacionId);
  }

  

  eliminarDetalle(detalleServicioId: any) {
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
        this.detalleService.eliminarDetalle(detalleServicioId).subscribe(
          (data) => {
            this.detalle = this.detalle.filter((detalles: any) => detalles.detalleId != detalleServicioId);
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

  procesarDetalle() {
    try {
      // Calcular el total de los subtotales
      this.SumaDeSubTotales = 0;
  
      this.detalle.forEach((detalles: any) => {
        this.SumaDeSubTotales += Number(detalles.subtotal);
      });
  
      // Actualizar el subtotal de servicios en la cotización
      this.cotizacion.subTotalServicios = this.SumaDeSubTotales.toFixed(2);
  
      // Actualizar el estado de la cotización
      this.cotizacion.estadoCotizacion = "FALTA PROCESAR";
  
      // Llamar al servicio para actualizar la cotización
      this.cotizacionService.actualizarCotizacion(this.cotizacion).subscribe(
        (data) => {
          Swal.fire({
            title: 'Cotización actualizada',
            text: 'La cotización ha sido actualizada con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            console.log('Cotización actualizada con éxito:', data);
            this.router.navigate(['/admin/ver-cotizacion-teccuida']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error en el sistema',
            text: 'No se ha podido actualizar la cotización',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error al actualizar cotización:', error);
        }
      );
    } catch (error) {
      // Manejo de errores generales
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error durante el procesamiento',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      console.error('Error en el procesamiento del detalle:', error);
    }
  }

}