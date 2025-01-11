import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { VentaService } from 'src/app/services/venta.service';
import { DatePipe } from '@angular/common';
import  Swal  from 'sweetalert2';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-view-compras',
  templateUrl: './view-compras.component.html',
  styleUrls: ['./view-compras.component.css']
})
export class ViewComprasComponent implements OnInit {

  compras: any[] = [];
  currentPage: number = 0;

  displayedColumns: string[] = ['Proveedor', 'Fecha de la Compra','Ver Detalle de la Compra', 'Cantidad de Productos', 'Estado','Total a Pagar','Acciones'];

  constructor(private modalService: ModalService, private ComprasService:ComprasService) { }

  ngOnInit(): void {
    this.getComprass(this.currentPage);
  }

  abrirModalCompra(): void {
    this.modalService.openNuevoCompraModal();
  }

  abrirModalActualizar(compraId:any): void {
    this.modalService.openCompraModalActualizar(compraId);
  }

  abrirModalDetalle(compraId:any): void {
    this.modalService.openViewDetalleModal(compraId);
  }

  getComprass(page: number): void {
    this.ComprasService.getCompras(page)
      .subscribe(
        response => {
          this.compras = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
        },
        error => {
          console.error('Error al obtener compras', error);
        }
      );
  }

  nextPage(): void {
    this.getComprass(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getComprass(this.currentPage - 1);
    }
  }

  eliminarCompra(compraId: any) {
    Swal.fire({
      title: 'Eliminar Compra',
      text: '¿Estás seguro de eliminar la compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ComprasService.eliminarCompras(compraId).subscribe(
          (data) => {
            this.compras = this.compras.filter((compra: any) => compra.compraId != compraId);
            Swal.fire('Compra eliminada', 'La compra ha sido eliminado de la base de datos', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar la compra', 'error');
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
