import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventarioService } from 'src/app/services/inventario.service';
import { VentaService } from 'src/app/services/venta.service';
import { ViewDetalleComponent } from '../view-detalle/view-detalle.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-procesar-venta',
  templateUrl: './modal-procesar-venta.component.html',
  styleUrls: ['./modal-procesar-venta.component.css']
})
export class ModalProcesarVentaComponent implements OnInit {

   inventarios:any = [];
    ventaId:any;
    selectedInventarioId: any;

    constructor(private InventarioService:InventarioService,@Inject(MAT_DIALOG_DATA) public datas: any,
    private VentasService:VentaService,
    public dialogRef: MatDialogRef<ViewDetalleComponent>,
   private dialogRef2: MatDialogRef<ModalProcesarVentaComponent>) { }

    ngOnInit(): void {
      this.ventaId = this.datas.ventaId;
      this.InventarioService.listarInventario().subscribe(
            (dato:any) => {
              this.inventarios = dato;
              console.log(this.inventarios);
            },(error) => {
              console.log(error);
              Swal.fire('Error !!','Error al cargar los datos','error');
            }
          )
    }

    closeModal(): void {
      this.dialogRef2.close();  // Cierra el modal
    }

    ProcesarVenta(): void {
      if (this.selectedInventarioId && this.ventaId) {
        this.VentasService.procesarVenta(this.ventaId, this.selectedInventarioId).subscribe({
          next: (response) => {
            Swal.fire({
              title: '¡Venta procesada con éxito!',
              text: 'La venta se ha procesado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.closeModal();
            window.location.reload();
          },
          error: (err) => {
            if (err.status === 400) {
              // Si el error es un Bad Request (400), mostrar el mensaje detallado enviado por el backend
              Swal.fire('Error', err.error, 'error'); // Mostrar el mensaje del backend
            } else if (err.status === 404) {
              // Si el error es un Not Found (404), manejar errores específicos como "Compra no encontrada"
              Swal.fire('Error', err.error, 'error');
            } else if (err.status === 500) {
              // Si el error es un Internal Server Error (500), mensaje genérico para errores de servidor
              Swal.fire('Error', 'Error inesperado al procesar la venta. Por favor, intente más tarde.', 'error');
            } else {
              // Manejo genérico de otros errores
              Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error');
            }
          }
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Por favor seleccione un inventario y asegúrese de que el ID de la compra esté presente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
}
