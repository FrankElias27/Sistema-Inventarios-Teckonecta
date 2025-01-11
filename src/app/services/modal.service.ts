import { Injectable, InjectionToken  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentanaModalComponent } from '../pages/admin/ventana-modal/ventana-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalDetalleComponent } from '../pages/admin/modal-detalle/modal-detalle.component';
import { ActualizarVentaComponent } from '../pages/admin/actualizar-venta/actualizar-venta.component';
import { VentanaModalComprasComponent } from '../pages/admin/ventana-modal-compras/ventana-modal-compras.component';
import { ActualizarCompraComponent } from '../pages/admin/actualizar-compra/actualizar-compra.component';
import { ModalDetalleComprasComponent } from '../pages/admin/modal-detalle-compras/modal-detalle-compras.component';
import { ModalCotizacionTeccuidaComponent } from '../pages/admin/modal-cotizacion-teccuida/modal-cotizacion-teccuida.component';
import { ModalCotizacionComponent } from '../pages/admin/modal-cotizacion/modal-cotizacion.component';
import { ModalDetalleCotizacionComponent } from '../pages/admin/modal-detalle-cotizacion/modal-detalle-cotizacion.component';
import { ModalDetalleServicioComponent } from '../pages/admin/modal-detalle-servicio/modal-detalle-servicio.component';
import { ModalProcesarCotizacionComponent } from '../pages/admin/modal-procesar-cotizacion/modal-procesar-cotizacion.component';
import { ModalGenerarCotizacionComponent } from '../pages/admin/modal-generar-cotizacion/modal-generar-cotizacion.component';
import { ActualizarCotizacionComponent } from '../pages/admin/actualizar-cotizacion/actualizar-cotizacion.component';
import { AddCategoriaComponent } from '../pages/admin/add-categoria/add-categoria.component';
import { ActualizarCategoriaComponent } from '../pages/admin/actualizar-categoria/actualizar-categoria.component';
import { AddProveedoresComponent } from '../pages/admin/add-proveedores/add-proveedores.component';
import { ActualizarProveedorComponent } from '../pages/admin/actualizar-proveedor/actualizar-proveedor.component';
import { AddClienteComponent } from '../pages/admin/add-cliente/add-cliente.component';
import { ActualizarClienteComponent } from '../pages/admin/actualizar-cliente/actualizar-cliente.component';
import { AddProductoComponent } from '../pages/admin/add-producto/add-producto.component';
import { ActualizarProductoComponent } from '../pages/admin/actualizar-producto/actualizar-producto.component';
import { SignupComponent } from '../pages/admin/signup/signup.component';
import { ViewDetalleComprasComponent } from '../pages/admin/view-detalle-compras/view-detalle-compras.component';
import { ViewDetalleComponent } from '../pages/admin/view-detalle/view-detalle.component';
import { ViewDetalleCotizacionComponent } from '../pages/admin/view-detalle-cotizacion/view-detalle-cotizacion.component';
import { ViewDetalleServicioComponent } from '../pages/admin/view-detalle-servicio/view-detalle-servicio.component';
import { AddServiciosComponent } from '../pages/admin/add-servicios/add-servicios.component';
import { ActualizarServicioComponent } from '../pages/admin/actualizar-servicio/actualizar-servicio.component';
import { ModalAsesorVentaComponent } from '../pages/admin/modal-asesor-venta/modal-asesor-venta.component';
import { AddAsesorVentaComponent } from '../pages/admin/add-asesor-venta/add-asesor-venta.component';
import { ActualizarAsesorVentaComponent } from '../pages/admin/actualizar-asesor-venta/actualizar-asesor-venta.component';
import { AddInventarioComponent } from '../pages/admin/add-inventario/add-inventario.component';
import { ActualizarInventarioComponent } from '../pages/admin/actualizar-inventario/actualizar-inventario.component';
import { ModalProcesarCompraComponent } from '../pages/admin/modal-procesar-compra/modal-procesar-compra.component';
import { ModalProcesarVentaComponent } from '../pages/admin/modal-procesar-venta/modal-procesar-venta.component';
import { AddExistenciaComponent } from '../pages/admin/add-existencia/add-existencia.component';
import { ActualizarStockInventarioComponent } from '../pages/admin/actualizar-stock-inventario/actualizar-stock-inventario.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialogRef: MatDialogRef<VentanaModalComponent> | null = null;

  dialogRef1: MatDialogRef<AddCategoriaComponent> | null = null;

  dialogRef14: MatDialogRef<ActualizarCategoriaComponent> | null = null;

  dialogRef15: MatDialogRef<AddProveedoresComponent> | null = null;

  dialogRef16: MatDialogRef<ActualizarProveedorComponent> | null = null;

  dialogRef17: MatDialogRef<AddClienteComponent> | null = null;

  dialogRef18: MatDialogRef<ActualizarClienteComponent> | null = null;

  dialogRef19: MatDialogRef<AddProductoComponent> | null = null;

  dialogRef20: MatDialogRef<ActualizarProductoComponent> | null = null;

  dialogRef21: MatDialogRef<SignupComponent> | null = null;

  dialogRef22: MatDialogRef<ViewDetalleComprasComponent> | null = null;

  dialogRef23: MatDialogRef<ViewDetalleComponent> | null = null;

  dialogRef24: MatDialogRef<ViewDetalleCotizacionComponent> | null = null;

  dialogRef25: MatDialogRef<ViewDetalleServicioComponent> | null = null;

  dialogRef26: MatDialogRef<AddServiciosComponent> | null = null;

  dialogRef27: MatDialogRef<ActualizarServicioComponent> | null = null;

  dialogRef28: MatDialogRef<ModalAsesorVentaComponent> | null = null;

  dialogRef29: MatDialogRef<AddAsesorVentaComponent> | null = null;

  dialogRef31: MatDialogRef<AddInventarioComponent> | null = null;

  dialogRef32: MatDialogRef<ActualizarInventarioComponent> | null = null;

  dialogRef35: MatDialogRef<AddExistenciaComponent> | null = null;

  dialogRef36: MatDialogRef<ActualizarStockInventarioComponent> | null = null;

  dialogRef2: MatDialogRef<ModalDetalleComponent> | null = null;

  dialogRef3: MatDialogRef<ActualizarVentaComponent> | null = null;

  dialogRef4: MatDialogRef<VentanaModalComprasComponent> | null = null;

  dialogRef5: MatDialogRef<ActualizarCompraComponent> | null = null;

  dialogRef6: MatDialogRef<ModalDetalleComprasComponent> | null = null;

  dialogRef7: MatDialogRef<ModalCotizacionTeccuidaComponent> | null = null;

  dialogRef8: MatDialogRef<ModalCotizacionComponent> | null = null;

  dialogRef9: MatDialogRef<ModalDetalleCotizacionComponent> | null = null;

  dialogRef10: MatDialogRef<ModalDetalleServicioComponent> | null = null;

  dialogRef11: MatDialogRef<ModalProcesarCotizacionComponent> | null = null;

  dialogRef12: MatDialogRef<ModalGenerarCotizacionComponent> | null = null;

  dialogRef13: MatDialogRef<ActualizarCotizacionComponent> | null = null;

  constructor(private dialog: MatDialog) { }

  openNuevoVentaModal(): void {
    this.dialogRef = this.dialog.open(VentanaModalComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openAddCategoriaModal(): void {
    this.dialogRef1 = this.dialog.open(AddCategoriaComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openActualizarCategoria(categoriaId: string): void {
    this.dialogRef14 = this.dialog.open(ActualizarCategoriaComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { categoriaId: categoriaId}
    });
  }

  openAddProveedorModal(): void {
    this.dialogRef15 = this.dialog.open(AddProveedoresComponent, {
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
    });
  }

  openActualizarProveedor(proveedorId: string): void {
    this.dialogRef16 = this.dialog.open(ActualizarProveedorComponent, {
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { proveedorId: proveedorId}
    });
  }

  openAddClienteModal(): void {
    this.dialogRef17 = this.dialog.open(AddClienteComponent, {
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
    });
  }

  openActualizarCliente(clienteId: string): void {
    this.dialogRef18= this.dialog.open(ActualizarClienteComponent, {
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { clienteId: clienteId}
    });
  }

  openAddProductoModal(): void {
    this.dialogRef19 = this.dialog.open(AddProductoComponent, {
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
    });
  }

  openActualizarProducto(productoId: string): void {
    this.dialogRef20= this.dialog.open(ActualizarProductoComponent, {
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { productoId: productoId}
    });
  }

  openAddUsuarioModal(): void {
    this.dialogRef21 = this.dialog.open(SignupComponent, {
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
    });
  }

  openViewDetalleModal(compraId: string): void {
    this.dialogRef22 = this.dialog.open(ViewDetalleComprasComponent, {
      width: '90%',
      maxWidth: '1500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { compraId: compraId}

    });

  }

  openViewDetalleVentaModal(ventaId: string): void {
    this.dialogRef23 = this.dialog.open(ViewDetalleComponent, {
      width: '90%',
      maxWidth: '1500px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { ventaId: ventaId}

    });

  }

  openViewDetalleCotizacion(cotizacionId: string): void {
    this.dialogRef24 = this.dialog.open(ViewDetalleCotizacionComponent, {
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { cotizacionId: cotizacionId}

    });

  }

  openViewDetalleServicios(cotizacionId: string): void {
    this.dialogRef25 = this.dialog.open(ViewDetalleServicioComponent, {
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { cotizacionId: cotizacionId}

    });

  }


  openAddServicioModal(): void {
    this.dialogRef26 = this.dialog.open(AddServiciosComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openActualizarServicio(servicioId: string): void {
    this.dialogRef27= this.dialog.open(ActualizarServicioComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { servicioId: servicioId}
    });
  }

  openViewAsesorModal(proveedorId: string): void {
    this.dialogRef28 = this.dialog.open(ModalAsesorVentaComponent, {
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { proveedorId: proveedorId}

    });

  }

  openAddAsesorModal(proveedorId:string) {
    const dialogRef29 = this.dialog.open(AddAsesorVentaComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { proveedorId: proveedorId}
    });
    return dialogRef29.afterClosed();
  }

  openActualizarAsesorModal(asesorId:string) {
    const dialogRef30 = this.dialog.open(ActualizarAsesorVentaComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { asesorId: asesorId}
    });
    return dialogRef30.afterClosed();
  }

  openAddInventarioModal(): void {
    this.dialogRef31 = this.dialog.open(AddInventarioComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openActualizarInventario(inventarioId: string): void {
    this.dialogRef32 = this.dialog.open(ActualizarInventarioComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { inventarioId : inventarioId}
    });
  }

  openProcesarCompra(compraId: string) {
    const dialogRef33 = this.dialog.open(ModalProcesarCompraComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { compraId: compraId}
    });
    return dialogRef33.afterClosed();
  }

  openProcesarVenta(ventaId: string) {
    const dialogRef34 = this.dialog.open(ModalProcesarVentaComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { ventaId: ventaId}
    });
    return dialogRef34.afterClosed();
  }

  openAddExistencia(): void {
    this.dialogRef35 = this.dialog.open(AddExistenciaComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openActualizarStock(stockId: string): void {
    this.dialogRef36 = this.dialog.open(ActualizarStockInventarioComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { stockId: stockId}
    });
  }

  openVentaModal(ventaId: string) {
    const dialogRef2 = this.dialog.open(ModalDetalleComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { ventaId: ventaId}
    });
    return dialogRef2.afterClosed();
  }

  openVentaModalActualizar(ventaId: string): void {
    this.dialogRef3 = this.dialog.open(ActualizarVentaComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { ventaId: ventaId}
    });
  }


  openNuevoCompraModal(): void {
    this.dialogRef4 = this.dialog.open(VentanaModalComprasComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openCompraModalActualizar(compraId: string): void {
    this.dialogRef5 = this.dialog.open(ActualizarCompraComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { compraId: compraId}
    });
  }

  openCompraModal(compraId: string){
    const dialogRef6 = this.dialog.open(ModalDetalleComprasComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { compraId: compraId}
    });
    return dialogRef6.afterClosed();
  }

  openNuevoCotizacionModal(): void {
    this.dialogRef7 = this.dialog.open(ModalCotizacionTeccuidaComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openNuevaCotizacion(): void {
    this.dialogRef8 = this.dialog.open(ModalCotizacionComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
    });
  }

  openCotizacionModal(cotizacionId: string) {
    const dialogRef9 = this.dialog.open(ModalDetalleCotizacionComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { cotizacionId: cotizacionId}
    });

    return dialogRef9.afterClosed();
  }

  openNuevoServicioModal(cotizacionId: string) {
    const dialogRef10 = this.dialog.open(ModalDetalleServicioComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { cotizacionId: cotizacionId}
    });

    return dialogRef10.afterClosed();
  }

  openProcesarCotizacion(cotizacionId: string): void {
    this.dialogRef11 = this.dialog.open(ModalProcesarCotizacionComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { cotizacionId: cotizacionId}
    });
  }
  openGenerarCotizacion(cotizacionId: string): void {
    this.dialogRef12 = this.dialog.open(ModalGenerarCotizacionComponent, {
      width: '1000px',
      disableClose: true,
      autoFocus: false,
      data: { cotizacionId: cotizacionId}
    });
  }

  openActualizarCotizacion(cotizacionId: string): void {
    this.dialogRef13 = this.dialog.open(ActualizarCotizacionComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { cotizacionId: cotizacionId}
    });
  }

  cerrarModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  cerrarAddCategoria(): void {
    if (this.dialogRef1) {
      this.dialogRef1.close();
    }
  }

  cerrarActualizarCategoria(): void {
    if (this.dialogRef14) {
      this.dialogRef14.close();
    }
  }

  cerrarAddProveedor(): void {
    if (this.dialogRef15) {
      this.dialogRef15.close();
    }
  }

  cerrarActualizarProveedor(): void {
    if (this.dialogRef16) {
      this.dialogRef16.close();
    }
  }

  cerrarAddCliente(): void {
    if (this.dialogRef17) {
      this.dialogRef17.close();
    }
  }

  cerrarActualizarCliente(): void {
    if (this.dialogRef18) {
      this.dialogRef18.close();
    }
  }

  cerrarAddProducto(): void {
    if (this.dialogRef19) {
      this.dialogRef19.close();
    }
  }

  cerrarActualizarProducto(): void {
    if (this.dialogRef20) {
      this.dialogRef20.close();
    }
  }

  cerrarAddUsuario(): void {
    if (this.dialogRef21) {
      this.dialogRef21.close();
    }
  }

  cerrarViewDetalleCompra(): void {
    if (this.dialogRef22) {
      this.dialogRef22.close();
    }
  }

  cerrarViewDetalleVenta(): void {
    if (this.dialogRef23) {
      this.dialogRef23.close();
    }
  }

  cerrarViewDetalleCotizacion(): void {
    if (this.dialogRef24) {
      this.dialogRef24.close();
    }
  }

  cerrarViewDetalleServicios(): void {
    if (this.dialogRef25) {
      this.dialogRef25.close();
    }
  }

  cerrarAddServicio(): void {
    if (this.dialogRef26) {
      this.dialogRef26.close();
    }
  }

  cerrarActualizarServicio(): void {
    if (this.dialogRef27) {
      this.dialogRef27.close();
    }
  }

  cerrarModalAsesor(): void {
    if (this.dialogRef28) {
      this.dialogRef28.close();
    }
  }

  cerrarAddAsesor(): void {
    if (this.dialogRef29) {
      this.dialogRef29.close();
    }
  }

  cerrarAddInventario(): void {
    if (this.dialogRef31) {
      this.dialogRef31.close();
    }
  }

  cerrarActualizarInventario(): void {
    if (this.dialogRef32) {
      this.dialogRef32.close();
    }
  }

  cerrarModal2(): void {
    if (this.dialogRef2) {
      this.dialogRef2.close();
    }
  }

  cerrarModalActualizar(): void {
    if (this.dialogRef3) {
      this.dialogRef3.close();
    }
  }

  cerrarModalCompras(): void {
    if (this.dialogRef4) {
      this.dialogRef4.close();
    }
  }

  cerrarModalActualizar2(): void {
    if (this.dialogRef5) {
      this.dialogRef5.close();
    }
  }

  cerrarModal3(): void {
    if (this.dialogRef6) {
      this.dialogRef6.close();
    }
  }

  cerrarModalCotizacion(): void {
    if (this.dialogRef7) {
      this.dialogRef7.close();
    }
  }

  cerrarModalCoti(): void {
    if (this.dialogRef8) {
      this.dialogRef8.close();
    }
  }

  cerrarModalDetalleCotizacion(): void {
    if (this.dialogRef9) {
      this.dialogRef9.close();
    }
  }

  cerrarServicioModal(): void {
    if (this.dialogRef10) {
      this.dialogRef10.close();
    }
  }

  cerrarProcesarModal(): void {
    if (this.dialogRef11) {
      this.dialogRef11.close();
    }
  }

  cerrarGenerarModal(): void {
    if (this.dialogRef12) {
      this.dialogRef12.close();
    }
  }

  cerrarActualizarCotizacion(): void {
    if (this.dialogRef13) {
      this.dialogRef13.close();
    }
  }

  cerrarAddExistencia(): void {
    if (this.dialogRef35) {
      this.dialogRef35.close();
    }
  }

  cerrarActualizarStock(): void {
    if (this.dialogRef36) {
      this.dialogRef36.close();
    }
  }
}
