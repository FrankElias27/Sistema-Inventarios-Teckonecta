import { Component, Inject, OnInit } from '@angular/core';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import  Swal  from 'sweetalert2';
import { ProductoService } from 'src/app/services/producto.service';
import { forkJoin } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-detalle',
  templateUrl: './view-detalle.component.html',
  styleUrls: ['./view-detalle.component.css']
})
export class ViewDetalleComponent implements OnInit {
  ventaId:any;
  cliente:any;
  detalle:any = [];
  displayedColumns: string[] = ['IT.','producto', 'costoCompra','tipoCambio','cantidad', 'costoSoles','utilidad', 'subtotal','Acciones'];
  detalles: any[] = []; // Asumiendo que detalle es tu array de objetos con los detalles
  totalAPagar: number = 0; // Variable para almacenar el total a pagar
  venta:any;
  cantidadTotal:number=0;
  cantidadPorProducto: { [key: number]: number } = {};
  productos:any[]=[];


  constructor(private detalleService:DetalleVentaService, private modalService:ModalService,
    private route:ActivatedRoute,private ventasService:VentaService,private router:Router, private productoService:ProductoService,
  @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.ventaId = this.data.ventaId;
    this.cliente = this.route.snapshot.params['cliente'];
    this.detalleService.listarDetalleVenta(this.ventaId).subscribe(
      (data:any) => {
        console.log(data);
        this.detalle = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.ventasService.obtenerVenta(this.ventaId).subscribe(
      (data) => {
        this.venta = data;
        console.log(this.venta);
      },
      (error) => {
        console.log(error);
      }
    )

  }

  cargarDetalles(): void {
    this.detalleService.listarDetalleVenta(this.ventaId).subscribe(
      (data:any) => {
        console.log(data);
        this.detalle = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  abrirModal(): void {
    this.ventaId = this.data.ventaId;
    this.modalService.openVentaModal(this.ventaId).subscribe(result => {
      if (result === 'actualizar') {
        this.cargarDetalles();  // Recarga la tabla si el modal ha sido guardado o actualizado
      }
    });
  }

  closeModal(): void {
    this.modalService.cerrarViewDetalleVenta();
  }

  procesarDetalle():void {
      if (this.venta.estado === 'PROCESADO') {
        Swal.fire({
          title: 'Venta ya procesada',
          text: 'Esta venta ya ha sido procesada y no se pueden realizar cambios.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
        return; // Salir del método si la compra ya está procesada
      }

      this.ventaId = this.data.ventaId;
      this.modalService.openProcesarVenta(this.ventaId).subscribe(result => {
        if (result === 'actualizar') {
          this.cargarDetalles();  // Recarga la tabla si el modal ha sido guardado o actualizado
        }
      });

    }

  eliminarDetalle(detalleVentaId: any) {
    Swal.fire({
      title: 'Eliminar detalle',
      text: '¿Estás seguro de eliminar el detalle?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detalleService.eliminarDetalle(detalleVentaId).subscribe(
          (data) => {
            this.detalle = this.detalle.filter((detalles: any) => detalles.detalleId != detalleVentaId);
            this.detalle = this.detalle.filter((detalles: any) => detalles.detalleVentaId !== detalleVentaId);
            Swal.fire('Detalle eliminado', 'El detalle ha sido eliminado de la base de datos', 'success')
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el detalle', 'error');
          }
        );
      }

    });
  }




}
