import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { VentaService } from 'src/app/services/venta.service';
import { DatePipe } from '@angular/common';
import  Swal  from 'sweetalert2';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-cotizacion-teccuida',
  templateUrl: './view-cotizacion-teccuida.component.html',
  styleUrls: ['./view-cotizacion-teccuida.component.css']
})
export class ViewCotizacionTeccuidaComponent implements OnInit {

  cotizacionId:any;
  cotizaciones: any[] = [];
  currentPage: number = 0;

  displayedColumns: string[] = ['Cliente', 'Fecha de la Cotizacion','Ver Detalle de la Cotizacion','Cotizacion','Estado','Total','Acciones'];

  constructor(private route:ActivatedRoute,private cotizacionService: CotizacionService,private datePipe: DatePipe,private modalService: ModalService) { }

  ngOnInit(): void {
    this.getCotizacioness(this.currentPage);
  }
  

  getCotizacioness(page: number): void {
    this.cotizacionService.getCotizaciones(page)
      .subscribe(
        response => {
          this.cotizaciones = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
        },
        error => {
          console.error('Error al obtener cotizaciones', error);
        }
      );
  }

  nextPage(): void {
    this.getCotizacioness(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getCotizacioness(this.currentPage - 1);
    }
  }

  abrirModalActualizar(cotizacionId:any): void {
    this.modalService.openActualizarCotizacion(cotizacionId);
  }

  abrirDetalleCotizacion(cotizacionId:any): void {
    this.modalService.openViewDetalleCotizacion(cotizacionId);
  }

  abrirDetalleServicios(cotizacionId:any): void {
    this.modalService.openViewDetalleServicios(cotizacionId);
  }


  eliminarCotizacion(cotizacionId: any) {
    Swal.fire({
      title: 'Eliminar cotización',
      text: '¿Estás seguro de eliminar la cotización?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cotizacionService.eliminarCotizaciones(cotizacionId).subscribe(
          (data) => {
            this.cotizaciones = this.cotizaciones.filter((cotizacion: any) => cotizacion.cotizacionId != cotizacionId);
            Swal.fire('Cotizacion eliminada', 'La cotizacion ha sido eliminado de la base de datos', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar la cotizacion', 'error');
          }
        );
      }

    });
  }

  abrirModal(): void {
    this.modalService.openNuevaCotizacion();
  }

  abrirModalProcesar(cotizacionId:any) {
    this.modalService.openProcesarCotizacion(cotizacionId);
  }
  abrirModalGenerar(cotizacionId:any) {
    this.modalService.openGenerarCotizacion(cotizacionId);
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'RECIEN CREADO':
        return 'estado-recién-creada';
      case 'FALTA PROCESAR':
        return 'estado-falta-procesar';
      case 'PROCESADO':
        return 'estado-procesado';
      default:
        return '';
    }
  }

}
