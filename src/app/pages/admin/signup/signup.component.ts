import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snack: MatSnackBar,
    private ModalService:ModalService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  closeModal() {
    this.ModalService.cerrarAddUsuario();
  }

  formSubmit() {

    // Validaciones específicas para cada campo
    if (!this.userForm.get('username')?.value) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    const passwordValue = this.userForm.get('password')?.value;
  if (!passwordValue) {
    this.snack.open('La contraseña es requerida !!', 'Aceptar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
    return;
  }

    // Validación de la contraseña: al menos una minúscula, una mayúscula y un dígito
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordPattern.test(passwordValue)) {
    this.snack.open('La contraseña debe tener al menos una letra minúscula, una mayúscula y un dígito !!', 'Aceptar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
    return;
  }

    if (!this.userForm.get('nombre')?.value) {
      this.snack.open('El nombre es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (!this.userForm.get('apellido')?.value) {
      this.snack.open('El apellido es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (!this.userForm.get('email')?.value) {
      this.snack.open('El email es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    // Validación del formato del email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.userForm.get('email')?.value)) {
      this.snack.open('Ingrese un email válido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    if (!this.userForm.get('telefono')?.value) {
      this.snack.open('El teléfono es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    // Validación del teléfono: exactamente 9 dígitos
    const telefonoPattern = /^\d{9}$/;
    if (!telefonoPattern.test(this.userForm.get('telefono')?.value)) {
      this.snack.open('El teléfono debe contener exactamente 9 dígitos numéricos !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    // Si todas las validaciones pasan
    const user = this.userForm.value;

    this.userService.añadirUsuario(user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado', 'Usuario registrado con éxito en el sistema', 'success').then(() => {
          this.closeModal();
          window.location.reload();
        });
      },
      (error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema.', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    );
  }

}
