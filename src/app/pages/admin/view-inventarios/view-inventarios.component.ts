import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-inventarios',
  templateUrl: './view-inventarios.component.html',
  styleUrls: ['./view-inventarios.component.css']
})
export class ViewInventariosComponent implements OnInit {

     inventarios: any[] = [];
    displayedColumns: string[] = [ 'Titulo','Ubicacion', 'Acciones'];
    currentPage: number = 0;

    constructor(private InventarioService:InventarioService, private ModalService:ModalService) { }

    ngOnInit(): void {
      this.getInventarios(this.currentPage); // Inicializa con la primera página
    }

    getInventarios(page: number): void {
      this.InventarioService.getInventarios(page)
        .subscribe(
          response => {
            this.inventarios = response.content; // Asigna el contenido de la página actual
            this.currentPage = response.number; // Actualiza la página actual
          },
          error => {
            console.error('Error al obtener los inventarios:', error); // Log de error

          }
        );
    }

    nextPage(): void {
      this.getInventarios(this.currentPage + 1);
    }

    prevPage(): void {
      if (this.currentPage > 0) {
        this.getInventarios(this.currentPage - 1);
      }
    }

    abrirAddInventario(): void {
      this.ModalService.openAddInventarioModal();
    }

    abrirModalActualizar(inventarioId: any): void {
      this.ModalService.openActualizarInventario(inventarioId);
    }

    eliminarInventario(inventarioId: any) {
      Swal.fire({
        title: 'Eliminar inventario',
        text: '¿Estás seguro de eliminar el inventario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.InventarioService.eliminarInventario(inventarioId).subscribe(
            (data) => {
              this.inventarios = this.inventarios.filter((inventario: any) => inventario.inventarioId != inventarioId);
              Swal.fire('Inventario eliminado', 'El inventario ha sido eliminado de la base de datos', 'success').then(
                (e) => {
                  location.reload()
                });
            },
            (error) => {
              Swal.fire('Error', 'Error al eliminar el inventario', 'error');
            }
          );
        }

      });
    }

}
