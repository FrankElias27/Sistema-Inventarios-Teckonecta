import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { DatePipe } from '@angular/common';
import { ModalService } from 'src/app/services/modal.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-view-ventas',
  templateUrl: './view-ventas.component.html',
  styleUrls: ['./view-ventas.component.css']
})
export class ViewVentasComponent implements OnInit {

  ventas: any[] = [];
  currentPage: number = 0;

  displayedColumns: string[] = ['Cliente', 'Fecha de la Venta','Ver Detalle de la Venta', 'Cantidad de Productos', 'Estado','Total a Pagar','Acciones'];

  constructor(private ventaService: VentaService,private datePipe: DatePipe,private modalService: ModalService) { }

  ngOnInit(): void {
    this.getVentass(this.currentPage);
  }
  abrirModal(): void {
    this.modalService.openNuevoVentaModal();
  }

  abrirModalActualizar(ventaId:any): void {
    this.modalService.openVentaModalActualizar(ventaId);
  }

  getVentass(page: number): void {
    this.ventaService.getVentas(page)
      .subscribe(
        response => {
          this.ventas = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
        },
        error => {
          console.error('Error al obtener productos', error);
        }
      );
  }

  nextPage(): void {
    this.getVentass(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getVentass(this.currentPage - 1);
    }
  }

  eliminarVenta(ventaId: any) {
    Swal.fire({
      title: 'Eliminar venta',
      text: '¿Estás seguro de eliminar la venta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaService.eliminarVentas(ventaId).subscribe(
          (data) => {
            this.ventas = this.ventas.filter((venta: any) => venta.ventaId != ventaId);
            Swal.fire('Venta eliminada', 'La venta ha sido eliminado de la base de datos', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar la venta', 'error');
          }
        );
      }

    });
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
