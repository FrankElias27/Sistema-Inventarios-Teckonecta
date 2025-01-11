import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsesorVentaService } from '../../../services/asesor-venta.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalAsesorVentaComponent } from '../modal-asesor-venta/modal-asesor-venta.component';

@Component({
  selector: 'app-add-asesor-venta',
  templateUrl: './add-asesor-venta.component.html',
  styleUrls: ['./add-asesor-venta.component.css']
})
export class AddAsesorVentaComponent implements OnInit {

  AsesorData = {
    nombre:'',
    telefono:'',
    proveedor:{
      proveedorId:'',
    }
  }

  constructor(private ModalService:ModalService,private snack:MatSnackBar,private AsesorVentaService:AsesorVentaService,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef2: MatDialogRef<AddAsesorVentaComponent>,
   public dialogRef: MatDialogRef<ModalAsesorVentaComponent>) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef2.close();  // Cierra el modal
  }

  guardarAsesor() {
      console.log(this.AsesorData);

      this.AsesorData.proveedor.proveedorId=this.data.proveedorId

      // Validación del campo Razón Social
      if (this.AsesorData.nombre.trim() === '' || this.AsesorData.nombre == null) {
        this.snack.open('El nombre del asesor es requerido', '', { duration: 3000 });
        return;
      }


      if (this.AsesorData.telefono == '' || this.AsesorData.telefono == null) {
        this.snack.open('El teléfono es requerido', '', {
          duration: 3000
        });
        return;
      }

      // Validación del teléfono: exactamente 9 dígitos
      const telefonoPattern = /^\d{9}$/;
      if (!telefonoPattern.test(this.AsesorData.telefono)) {
        this.snack.open('El teléfono debe contener exactamente 9 dígitos numéricos', '', {
          duration: 3000
        });
        return;
      }

      // Si todas las validaciones pasan, realiza el guardado
      this.AsesorVentaService.agregarAsesorVenta(this.AsesorData).subscribe(
        (data) => {
          console.log(data);
          Swal.fire('Asesor guardado', 'El asesor ha sido guardado con éxito', 'success').then(
            (e) => {
              this.dialogRef.close('actualizar');
            });
        },
        (error) => {
          if (error.status === 400) {
            // Mostrar el mensaje de error recibido desde el backend
                Swal.fire('Error', error.error, 'error');
          } else {
            // Manejar otros errores
                Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error');
          }
        }
      );
    }

}
