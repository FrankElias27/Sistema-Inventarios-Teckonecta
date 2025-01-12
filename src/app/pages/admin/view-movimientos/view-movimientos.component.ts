import { Component, OnInit } from '@angular/core';
import { TransferService } from '../../../services/transfer.service';
import { ModalService } from '../../../services/modal.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-movimientos',
  templateUrl: './view-movimientos.component.html',
  styleUrls: ['./view-movimientos.component.css']
})
export class ViewMovimientosComponent implements OnInit {

  transfer: any[] = [];

  currentPage: number = 0;

  displayedColumns: string[] = ['Origen','=>','Destino', 'Fecha de la Transferencia','Ver Detalle de la Transferencia', 'Estado','Acciones'];

  constructor(private TransferService:TransferService,private ModalService:ModalService) { }

  ngOnInit(): void {
    this.getTransfer(this.currentPage);
  }

  abrirModal(): void {
    this.ModalService.openAddMovimiento();
  }

  getTransfer(page: number): void {
    this.TransferService.getTransfer(page)
      .subscribe(
        response => {
          this.transfer = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
          console.log(this.transfer)
        },
        error => {
          console.error('Error al obtener transfer', error);
        }
      );
  }

  nextPage(): void {
    this.getTransfer(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getTransfer(this.currentPage - 1);
    }
  }

  eliminarMovimiento(transferId: any) {
      Swal.fire({
        title: 'Eliminar Movimiento',
        text: '¿Estás seguro de eliminar el movimiento?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.TransferService.eliminarTransfer(transferId).subscribe(
            (data) => {
              this.transfer = this.transfer.filter((transfers: any) => transfers.transferId != transferId);
              Swal.fire('Movimiento eliminado', 'El movimiento ha sido eliminado de la base de datos', 'success').then(
                (e) => {
                  location.reload()
                });
            },
            (error) => {
              Swal.fire('Error', 'Error al eliminar el movimiento', 'error');
            }
          );
        }

      });
    }

}
