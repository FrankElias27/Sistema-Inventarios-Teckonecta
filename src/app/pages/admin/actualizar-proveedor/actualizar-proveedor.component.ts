import { Component, Inject, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import  Swal  from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-actualizar-proveedor',
  templateUrl: './actualizar-proveedor.component.html',
  styleUrls: ['./actualizar-proveedor.component.css']
})
export class ActualizarProveedorComponent implements OnInit {

  constructor(private ProveedorService:ProveedorService,private router:Router,private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any, private ModalService:ModalService
  ) { }

  proveedorId = 0;
  proveedor:any;

  ngOnInit(): void {
    this.proveedorId = this.data.proveedorId;
    this.ProveedorService.obtenerProveedor(this.proveedorId).subscribe(
      (data) => {
        this.proveedor = data;
        console.log(this.proveedor);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  closeModal() {
    this.ModalService.cerrarActualizarProveedor();
  }


  actualizarDatos() {

    this.ProveedorService.actualizarProveedor(this.proveedor).subscribe(
      (data) => {
        Swal.fire('Proveedor actualizado', 'Proveedor ha sido actualizado con éxito', 'success').then(() => {
          this.closeModal();
          window.location.reload();
        });
      },
      (error) => {
              if (error.status === 400) {
                // Si es un error de cliente existente
                Swal.fire('Error', error.error, 'error');
              } else if (error.status === 404) {
                // Si el cliente no fue encontrado
                Swal.fire('Error', error.error, 'error');
              } else if (error.status === 500) {
                // Si es un error inesperado
                Swal.fire('Error', error.error || 'Error inesperado al actualizar el cliente.', 'error');
              } else {
                // Manejar otros errores
                Swal.fire('Error en el sistema', 'No se ha podido actualizar el cliente', 'error');
              }
              console.log(error);
            }
    );
  }

}
