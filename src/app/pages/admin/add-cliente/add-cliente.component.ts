import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {

  clienteData = {
    nombre:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    fechaNacimiento: '',
    direccion:'',
    dni:'',
    correo:'',
    telefono:''
  }

  constructor( private clienteService:ClientesService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

  guardarCliente() {
    console.log(this.clienteData);

    if (this.clienteData.nombre.trim() == '' || this.clienteData.nombre == null) {
      this.snack.open('El nombre del cliente es requerido', '', {
        duration: 3000
      });
      return;
    }

    if (this.clienteData.apellidoPaterno.trim() == '' || this.clienteData.apellidoPaterno == null) {
      this.snack.open('El apellido paterno es requerido', '', {
        duration: 3000
      });
      return;
    }

    if (this.clienteData.apellidoMaterno.trim() == '' || this.clienteData.apellidoMaterno == null) {
      this.snack.open('El apellido materno es requerido', '', {
        duration: 3000
      });
      return;
    }

    if (this.clienteData.dni == '' || this.clienteData.dni == null) {
      this.snack.open('El DNI o RUC es requerido', '', {
        duration: 3000
      });
      return;
    }


    if (!this.clienteData.fechaNacimiento) {
      this.snack.open('La fecha de nacimiento es requerida', '', {
        duration: 3000
      });
      return;
    }

    if (this.clienteData.direccion.trim() == '' || this.clienteData.direccion == null) {
      this.snack.open('La dirección del cliente es requerido', '', {
        duration: 3000
      });
      return;
    }

    if (this.clienteData.correo.trim() == '' || this.clienteData.correo == null) {
      this.snack.open('El correo es requerido', '', {
        duration: 3000
      });
      return;
    }

    // Validación del formato del correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.clienteData.correo)) {
      this.snack.open('Correo inválido', '', {
        duration: 3000
      });
      return;
    }

    if (this.clienteData.telefono == '' || this.clienteData.telefono == null) {
      this.snack.open('El teléfono es requerido', '', {
        duration: 3000
      });
      return;
    }

    // Validación del teléfono: exactamente 9 dígitos
    const telefonoPattern = /^\d{9}$/;
    if (!telefonoPattern.test(this.clienteData.telefono)) {
      this.snack.open('El teléfono debe contener exactamente 9 dígitos numéricos', '', {
        duration: 3000
      });
      return;
    }

    // Si todas las validaciones pasan, realiza el guardado
    this.clienteService.agregarCliente(this.clienteData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Cliente guardado', 'El cliente ha sido guardado con éxito', 'success');
        this.clienteData = {
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          fechaNacimiento: '',
          direccion: '',
          dni: '',
          correo: '',
          telefono: ''
        };

        this.router.navigate(['/admin/clientes']);
      },
      (error) => {
        Swal.fire('Error', 'Error al guardar el cliente', 'error');
      }
    );
  }


}
