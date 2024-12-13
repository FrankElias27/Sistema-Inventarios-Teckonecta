import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service'; // Ajusta la ruta según sea necesario
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-cotizacion-teccuida',
  templateUrl: './modal-cotizacion-teccuida.component.html',
  styleUrls: ['./modal-cotizacion-teccuida.component.css']
})
export class ModalCotizacionTeccuidaComponent implements OnInit {

  tipoCambioForm!: FormGroup;
  loading = false;

  constructor(private modalService:ModalService,private fb: FormBuilder,private snack: MatSnackBar,
    private productoService: ProductoService,private router:Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tipoCambioForm = this.fb.group({
      tipoCambio: ['', Validators.required]
    });
  }

  closeModal() {
    this.modalService.cerrarModalCotizacion();
  }

  onSubmit(): void {
    if (this.tipoCambioForm.invalid) {
      this.snack.open('Falta colocar el Tipo de Cambio', '',{
        duration: 3000
      });
      return;
    }

    // Obtener el valor del tipo de cambio y verificar que sea un número válido
    const tipoCambio = parseFloat(this.tipoCambioForm.get('tipoCambio')?.value ?? '');
    if (isNaN(tipoCambio)) {
      Swal.fire({
        title: 'Error',
        text: 'Tipo de cambio no válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.loading = true;

    this.productoService.listarProductoDetalle().subscribe(
      (productos: any[]) => {
        // Usar un array para las solicitudes de actualización
        const updateRequests = productos.map(producto => {
          const nuevoPrecioVenta = (((producto.precioCompra * 1.18) * tipoCambio) / (1 - (30 / 100))).toFixed(2);
          return this.productoService.actualizarProductos({
            ...producto,
            precioCotizacion: parseFloat(nuevoPrecioVenta) // Convertir a número
          }).toPromise(); // Convertir a promesa
        });

        // Ejecutar todas las solicitudes de actualización en paralelo
        Promise.all(updateRequests).then(() => {
          this.loading = false;
          // Mostrar alerta de éxito usando SweetAlert2
          Swal.fire({
            title: 'Éxito',
            text: 'Los productos han sido actualizados con el tipo de cambio.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/admin/ver-cotizacion-teccuida']);
            this.closeModal(); // Cierra el modal después de mostrar el mensaje
          });
        }).catch(error => {
          this.loading = false;
          // Mostrar alerta de error usando SweetAlert2
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar los productos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error actualizando productos:', error);
        });
      },
      error => {
        this.loading = false;
        // Mostrar alerta de error usando SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener los productos.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error obteniendo productos:', error);
      }
    );
  }
}



