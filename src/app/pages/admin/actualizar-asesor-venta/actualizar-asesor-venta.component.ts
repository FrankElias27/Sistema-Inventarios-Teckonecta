import { Component, Inject, OnInit } from '@angular/core';
import { AsesorVentaService } from '../../../services/asesor-venta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal.service';
import Swal from 'sweetalert2';
import { ModalAsesorVentaComponent } from '../modal-asesor-venta/modal-asesor-venta.component';

@Component({
  selector: 'app-actualizar-asesor-venta',
  templateUrl: './actualizar-asesor-venta.component.html',
  styleUrls: ['./actualizar-asesor-venta.component.css']
})
export class ActualizarAsesorVentaComponent implements OnInit {

  constructor(private AsesorVentaService:AsesorVentaService,private router:Router,private route:ActivatedRoute,
      @Inject(MAT_DIALOG_DATA) public data: any, private ModalService:ModalService,
         public dialogRef: MatDialogRef<ModalAsesorVentaComponent>,
        private dialogRef2: MatDialogRef<ActualizarAsesorVentaComponent>) { }

      asesorId = 0;
      asesor:any;

  ngOnInit(): void {
    this.asesorId = this.data.asesorId;
        this.AsesorVentaService.obtenerAsesorVenta(this.asesorId).subscribe(
          (data) => {
            this.asesor = data;

            console.log(this.asesor);
          },
          (error) => {
            console.log(error);
          }
        );
  }
  closeModal(): void {
    this.dialogRef2.close();  // Cierra el modal
  }

  actualizarDatos(){
      this.AsesorVentaService.actualizarAsesorVenta(this.asesor).subscribe(
        (data) => {
          Swal.fire('Asesor actualizado', 'Asesor ha sido actualizado con éxito', 'success').then(
            (e) => {
              this.dialogRef.close('actualizar');
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
            Swal.fire('Error', error.error || 'Error inesperado al actualizar el asesor.', 'error');
          } else {
            // Manejar otros errores
            Swal.fire('Error en el sistema', 'No se ha podido actualizar el asesor', 'error');
          }
          console.log(error);
        }
      );
    }

}
