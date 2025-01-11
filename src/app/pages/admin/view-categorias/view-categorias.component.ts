import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent implements OnInit {


  categorias: any[] = [];
  displayedColumns: string[] = [ 'Titulo', 'Descripcion', 'Acciones'];
  currentPage: number = 0;

  constructor(private categoriaService:CategoriaService,private ModalService: ModalService) { }

  ngOnInit(): void {
    this.getCategorias(this.currentPage); // Inicializa con la primera página
  }

  getCategorias(page: number): void {
    this.categoriaService.getCategorias(page)
      .subscribe(
        response => {
          this.categorias = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
        },
        error => {
          console.error('Error al obtener las categorías:', error); // Log de error

        }
      );
  }

  nextPage(): void {
    this.getCategorias(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getCategorias(this.currentPage - 1);
    }
  }

  abrirAddCategoria(): void {
    this.ModalService.openAddCategoriaModal();
  }

  abrirModalActualizar(categoriaId: any): void {
    this.ModalService.openActualizarCategoria(categoriaId);
  }


  eliminarCategoria(categoriaId: any) {
    Swal.fire({
      title: 'Eliminar categoría',
      text: '¿Estás seguro de eliminar la categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoriaId).subscribe(
          (data) => {
            this.categorias = this.categorias.filter((categoria: any) => categoria.categoriaId != categoriaId);
            Swal.fire('Categoría eliminada', 'La categoría ha sido eliminado de la base de datos.', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar la categoría', 'error');
          }
        );
      }

    });
  }

}

