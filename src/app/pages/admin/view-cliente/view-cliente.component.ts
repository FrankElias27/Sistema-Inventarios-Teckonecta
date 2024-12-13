import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-cliente',
  templateUrl: './view-cliente.component.html',
  styleUrls: ['./view-cliente.component.css']
})
export class ViewClienteComponent implements OnInit {

  clientes: any[] = [];
  currentPage: number = 0;

  displayedColumns: string[] = ['DNI', 'Cliente','Fecha de Nacimiento', 'Direccion','Correo','Telefono','Acciones'];

  constructor(private ClientesService:ClientesService) { }

  ngOnInit(): void {
    this.getClientess(this.currentPage);
  }

  getClientess(page: number): void {
    this.ClientesService.getClientes(page)
      .subscribe(
        response => {
          this.clientes = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
        },
        error => {
          console.error('Error al obtener clientes', error);
        }
      );
  }

  nextPage(): void {
    this.getClientess(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getClientess(this.currentPage - 1);
    }
  }

  eliminarCliente(clienteId: any) {
    Swal.fire({
      title: 'Eliminar cliente',
      text: '¿Estás seguro de eliminar el cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ClientesService.eliminarCliente(clienteId).subscribe(
          (data) => {
            this.clientes = this.clientes.filter((cliente: any) => cliente.clienteId != clienteId);
            Swal.fire('Cliente eliminado', 'El cliente ha sido eliminado de la base de datos', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el cliente', 'error');
          }
        );
      }

    });
  }

}
