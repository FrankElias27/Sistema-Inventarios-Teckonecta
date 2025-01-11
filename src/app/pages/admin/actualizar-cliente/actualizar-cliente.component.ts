import { Component, Inject, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import  Swal  from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal.service';
import * as moment from 'moment';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {

  constructor(private ClientesService:ClientesService,private router:Router,private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any, private ModalService:ModalService
  ) { }

  clienteId = 0;
  cliente:any;

  ngOnInit(): void {
    this.clienteId = this.data.clienteId;
    this.ClientesService.obtenerClientes(this.clienteId).subscribe(
      (data) => {
        this.cliente = data;

        // Asegurarse de que la fecha se mantenga en el formato correcto
        if (this.cliente.fechaNacimiento) {
          // Usar parseZone para asegurarse de que la fecha no se vea afectada por la zona horaria
          const fechaFormateada = moment.parseZone(this.cliente.fechaNacimiento).format('MM/DD/YYYY');

          // Convertir la fecha a un objeto Date
          const dateObj = moment(fechaFormateada, 'MM/DD/YYYY').toDate();

          // Asignar el objeto Date al modelo
          this.cliente.fechaNacimiento = dateObj;
        }

        console.log(this.cliente);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeModal() {
    this.ModalService.cerrarActualizarCliente();
  }

  actualizarDatos(){
    this.ClientesService.actualizarCliente(this.cliente).subscribe(
      (data) => {
        Swal.fire('Cliente actualizado', 'Cliente ha sido actualizado con éxito', 'success').then(() => {
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
