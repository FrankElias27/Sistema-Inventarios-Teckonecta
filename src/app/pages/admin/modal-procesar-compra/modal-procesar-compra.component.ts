import { Component, Inject, OnInit } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewDetalleComprasComponent } from '../view-detalle-compras/view-detalle-compras.component';
import { ComprasService } from '../../../services/compras.service';


@Component({
  selector: 'app-modal-procesar-compra',
  templateUrl: './modal-procesar-compra.component.html',
  styleUrls: ['./modal-procesar-compra.component.css']
})
export class ModalProcesarCompraComponent implements OnInit {

  inventarios:any = [];
  compraId:any;
  selectedInventarioId: any;

  constructor(private InventarioService:InventarioService,@Inject(MAT_DIALOG_DATA) public datas: any,
  private ComprasService:ComprasService,
  public dialogRef: MatDialogRef<ViewDetalleComprasComponent>,
 private dialogRef2: MatDialogRef<ModalProcesarCompraComponent>) { }

  ngOnInit(): void {
    this.compraId = this.datas.compraId;
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

  ProcesarCompra(): void {
    if (this.selectedInventarioId && this.compraId) {
      this.ComprasService.procesarCompra(this.compraId, this.selectedInventarioId).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Compra procesada con éxito!',
            text: 'La compra se ha procesado correctamente.',
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
            Swal.fire('Error', 'Error inesperado al procesar la compra. Por favor, intente más tarde.', 'error');
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
