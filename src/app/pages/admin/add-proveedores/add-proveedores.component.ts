import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-add-proveedores',
  templateUrl: './add-proveedores.component.html',
  styleUrls: ['./add-proveedores.component.css']
})
export class AddProveedoresComponent implements OnInit {

  proveedorData = {
    razonSocial:'',
    direccion:'',
    ruc:'',
    correo: '',
    telefono:'',
    infoProductos:''
  }

  constructor(private proveedorService:ProveedorService,private snack:MatSnackBar,private router:Router,private ModalService:ModalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.ModalService.cerrarAddProveedor();
  }

  guardarProveedor() {
    console.log(this.proveedorData);

    // Validación del campo Razón Social
    if (this.proveedorData.razonSocial.trim() === '' || this.proveedorData.razonSocial == null) {
      this.snack.open('El nombre del proveedor es requerido', '', { duration: 3000 });
      return;
    }

    if (this.proveedorData.ruc == '' || this.proveedorData.ruc == null) {
      this.snack.open('El DNI o RUC es requerido', '', {
        duration: 3000
      });
      return;
    }

    // Validación del DNI o RUC: solo números y exactamente 8 o 11 dígitos
    const dniPattern = /^\d{11}$/;
    if (!dniPattern.test(this.proveedorData.ruc)) {
      this.snack.open('El  RUC debe contener exactamente 11 dígitos numéricos', '', {
        duration: 3000
      });
      return;
    }


    // Validación del campo Dirección
    if (this.proveedorData.direccion.trim() === '' || this.proveedorData.direccion == null) {
      this.snack.open('La dirección es requerida', '', { duration: 3000 });
      return;
    }

    // Validación del campo Correo
    if (this.proveedorData.correo.trim() === '' || this.proveedorData.correo == null) {
      this.snack.open('El correo es requerido', '', { duration: 3000 });
      return;
    }

    // Validación del formato del correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.proveedorData.correo)) {
      this.snack.open('Correo inválido', '', { duration: 3000 });
      return;
    }

    if (this.proveedorData.telefono == '' || this.proveedorData.telefono == null) {
      this.snack.open('El teléfono es requerido', '', {
        duration: 3000
      });
      return;
    }

    // Validación del teléfono: exactamente 9 dígitos
    const telefonoPattern = /^\d{9}$/;
    if (!telefonoPattern.test(this.proveedorData.telefono)) {
      this.snack.open('El teléfono debe contener exactamente 9 dígitos numéricos', '', {
        duration: 3000
      });
      return;
    }

    // Si todas las validaciones pasan, realiza el guardado
    this.proveedorService.agregarProveedor(this.proveedorData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Proveedor guardado', 'El proveedor ha sido guardado con éxito', 'success').then(() => {
          this.closeModal();
          window.location.reload();
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
