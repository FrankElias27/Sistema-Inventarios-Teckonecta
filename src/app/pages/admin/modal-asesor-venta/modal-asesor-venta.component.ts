import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsesorVentaService } from '../../../services/asesor-venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-asesor-venta',
  templateUrl: './modal-asesor-venta.component.html',
  styleUrls: ['./modal-asesor-venta.component.css']
})
export class ModalAsesorVentaComponent implements OnInit {


  proveedorId:any;
  asesores: any[] = [];
  currentPage: number = 0;
  displayedColumns: string[] = ['IT.', 'Asesor de Venta','Telefono','Acciones'];

  constructor(private ModalService:ModalService,@Inject(MAT_DIALOG_DATA) public data: any,
              private AsesorVentaService:AsesorVentaService,) { }

  ngOnInit(): void {
    this.proveedorId = this.data.proveedorId;
    this.AsesorVentaService.listarDetalleAsesores(this.proveedorId).subscribe(
      (data:any) => {
        console.log(data);
        this.asesores = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeModal() {
    this.ModalService.cerrarModalAsesor();
  }

  cargarDetalles(): void {
    this.AsesorVentaService.listarDetalleAsesores(this.proveedorId).subscribe(
      (data:any) => {
        console.log(data);
        this.asesores = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  abrirModal(): void {
    this.proveedorId = this.data.proveedorId;
    this.ModalService.openAddAsesorModal(this.proveedorId).subscribe(result => {
      if (result === 'actualizar') {
        this.cargarDetalles();  // Recarga la tabla si el modal ha sido guardado o actualizado
      }
    });
  }

  abrirModalActualizar(asesorId:any): void {
    this.ModalService.openActualizarAsesorModal(asesorId).subscribe(result => {
      if (result === 'actualizar') {
        this.cargarDetalles();  // Recarga la tabla si el modal ha sido guardado o actualizado
      }
    });
  }

  eliminarAsesor(asesorId: any) {
      Swal.fire({
        title: 'Eliminar Asesor',
        text: '¿Estás seguro de eliminar el asesor?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.AsesorVentaService.eliminarAsesorVenta(asesorId).subscribe(
            (data) => {
              this.asesores = this.asesores.filter((asesor: any) => asesor.asesorId != asesorId);
              Swal.fire('Asesor eliminado', 'El asesor ha sido eliminado de la base de datos', 'success')
            },
            (error) => {
              Swal.fire('Error', 'Error al eliminar el detalle', 'error');
            }
          );
        }

      });
    }

}
