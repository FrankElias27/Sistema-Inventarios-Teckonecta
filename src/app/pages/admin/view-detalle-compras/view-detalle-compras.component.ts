import { Component, Inject, OnInit } from '@angular/core';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import  Swal  from 'sweetalert2';
import { ProductoService } from 'src/app/services/producto.service';
import { forkJoin } from 'rxjs';
import { ComprasService } from 'src/app/services/compras.service';
import { DetalleCompraService } from 'src/app/services/detalle-compra.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-detalle-compras',
  templateUrl: './view-detalle-compras.component.html',
  styleUrls: ['./view-detalle-compras.component.css']
})
export class ViewDetalleComprasComponent implements OnInit {
  compraId:any;
  proveedor:any;
  detalle:any = [];
  displayedColumns: string[] = ['IT.','producto', 'costoCompra','tipoCambio', 'cantidad', 'costoSoles', 'subtotal','Acciones'];
  detalles: any[] = []; // Asumiendo que detalle es tu array de objetos con los detalles
  totalAPagar: number = 0; // Variable para almacenar el total a pagar
  compra:any;
  cantidadTotal:number=0;
  cantidadPorProducto: { [key: number]: number } = {};
  productos:any[]=[];

  constructor( private modalService:ModalService,private detalleService:DetalleCompraService,
    private route:ActivatedRoute,private comprasService:ComprasService,private router:Router, private productoService:ProductoService,
  @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.compraId = this.data.compraId;
    this.proveedor = this.route.snapshot.params['proveedor'];
    this.detalleService.listarDetalleCompra(this.compraId).subscribe(
      (data:any) => {
        console.log(data);
        this.detalle = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.comprasService.obtenerCompra(this.compraId).subscribe(
      (data) => {
        this.compra = data;
        console.log(this.compra);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  cargarDetalles(): void {
    this.detalleService.listarDetalleCompra(this.compraId).subscribe(
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
    this.compraId = this.data.compraId;
    this.modalService.openCompraModal(this.compraId).subscribe(result => {
      if (result === 'actualizar') {
        this.cargarDetalles();  // Recarga la tabla si el modal ha sido guardado o actualizado
      }
    });
  }

  closeModal(): void {
    this.modalService.cerrarViewDetalleCompra();
  }

  procesarDetalle():void {
    if (this.compra.estado === 'PROCESADO') {
      Swal.fire({
        title: 'Compra ya procesada',
        text: 'Esta compra ya ha sido procesada y no se pueden realizar cambios.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return; // Salir del método si la compra ya está procesada
    }

    this.compraId = this.data.compraId;
    this.modalService.openProcesarCompra(this.compraId).subscribe(result => {
      if (result === 'actualizar') {
        this.cargarDetalles();  // Recarga la tabla si el modal ha sido guardado o actualizado
      }
    });

  }


  eliminarDetalle(detalleCompraId: any) {
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
        this.detalleService.eliminarDetalle(detalleCompraId).subscribe(
          (data) => {
            this.detalle = this.detalle.filter((detalles: any) => detalles.detalleId != detalleCompraId);
            this.detalle = this.detalle.filter((detalles: any) => detalles.detalleCompraId !== detalleCompraId);
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
