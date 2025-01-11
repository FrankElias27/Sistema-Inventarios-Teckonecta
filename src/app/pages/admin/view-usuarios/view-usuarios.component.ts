import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-usuarios',
  templateUrl: './view-usuarios.component.html',
  styleUrls: ['./view-usuarios.component.css']
})
export class ViewUsuariosComponent implements OnInit {

  usuarios: any[] = [];
  currentPage: number = 0;

  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Username', 'Rol','Correo','Telefono','Acciones'];

   constructor(private UserService:UserService,
      private ModalService:ModalService
    ) { }

    ngOnInit(): void {
      this.getUsuarios(this.currentPage);
    }

    getUsuarios(page: number): void {
      this.UserService.getUsuarios(page)
        .subscribe(
          response => {
            this.usuarios = response.content; // Asigna el contenido de la página actual
            this.currentPage = response.number; // Actualiza la página actual
          },
          error => {
            console.error('Error al obtener usuarios', error);
          }
        );
    }

    nextPage(): void {
      this.getUsuarios(this.currentPage + 1);
    }

    prevPage(): void {
      if (this.currentPage > 0) {
        this.getUsuarios(this.currentPage - 1);
      }
    }

    abrirAddUsuario(): void {
      this.ModalService.openAddUsuarioModal();
    }





}
