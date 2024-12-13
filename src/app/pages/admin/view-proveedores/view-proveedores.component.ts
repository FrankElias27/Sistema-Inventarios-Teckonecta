import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import Swal from 'sweetalert2';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-view-proveedores',
  templateUrl: './view-proveedores.component.html',
  styleUrls: ['./view-proveedores.component.css']
})
export class ViewProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  currentPage: number = 0;

  displayedColumns: string[] = ['DNI', 'Cliente', 'Direccion','Correo','Telefono','Acciones'];

  constructor(private ProveedorService:ProveedorService) { }

  ngOnInit(): void {
    this.getProveedoress(this.currentPage);
  }
  getProveedoress(page: number): void {
    this.ProveedorService.getProveedores(page)
      .subscribe(
        response => {
          this.proveedores = response.content; // Asigna el contenido de la página actual
          this.currentPage = response.number; // Actualiza la página actual
        },
        error => {
          console.error('Error al obtener proveedores', error);
        }
      );
  }

  nextPage(): void {
    this.getProveedoress(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.getProveedoress(this.currentPage - 1);
    }
  }

  eliminarProveedor(proveedorId: any) {
    Swal.fire({
      title: 'Eliminar proveedor',
      text: '¿Estás seguro de eliminar el proveedor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProveedorService.eliminarProveedor(proveedorId).subscribe(
          (data) => {
            this.proveedores = this.proveedores.filter((proveedor: any) => proveedor.proveedorId != proveedorId);
            Swal.fire('Proveedor eliminado', 'El proveedor ha sido eliminado de la base de datos', 'success').then(
              (e) => {
                location.reload()
              });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el proveedor', 'error');
          }
        );
      }

    });
  }

}
