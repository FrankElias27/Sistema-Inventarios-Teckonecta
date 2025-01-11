import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-view-servicios',
  templateUrl: './view-servicios.component.html',
  styleUrls: ['./view-servicios.component.css']
})
export class ViewServiciosComponent implements OnInit {

  servicios: any[] = [];
  displayedColumns: string[] = [ 'Titulo', 'Acciones'];
  currentPage: number = 0;

  constructor(private serviciosService:ServicioService, private ModalService:ModalService) { }

  ngOnInit(): void {
    this.getServicios(this.currentPage); // Inicializa con la primera página
  }

  getServicios(page: number): void {
    this.serviciosService.getServicios(page)
      .subscribe(
        response => {
          this.servicios = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
        },
        error => {
          console.error('Error al obtener los servicios:', error); // Log de error

        }
      );
  }

  nextPage(): void {
    this.getServicios(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getServicios(this.currentPage - 1);
    }
  }

  abrirAddCategoria(): void {
    this.ModalService.openAddServicioModal();
  }

  abrirModalActualizar(servicioId: any): void {
    this.ModalService.openActualizarServicio(servicioId);
  }

  eliminarServicio(servicioId: any) {
    Swal.fire({
      title: 'Eliminar servicio',
      text: '¿Estás seguro de eliminar el servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviciosService.eliminarServicio(servicioId).subscribe(
          (data) => {
            this.servicios = this.servicios.filter((servicio: any) => servicio.servicioId != servicioId);
            Swal.fire('Servicio eliminado', 'El servicio ha sido eliminado de la base de datos', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el servicio', 'error');
          }
        );
      }

    });
  }
}
