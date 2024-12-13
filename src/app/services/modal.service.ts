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


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialogRef: MatDialogRef<VentanaModalComponent> | null = null;

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

  openVentaModal(ventaId: string): void {
    this.dialogRef2 = this.dialog.open(ModalDetalleComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { ventaId: ventaId}
    });
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

  openCompraModal(compraId: string): void {
    this.dialogRef6 = this.dialog.open(ModalDetalleComprasComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { compraId: compraId}
    });
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

  openCotizacionModal(cotizacionId: string): void {
    this.dialogRef9 = this.dialog.open(ModalDetalleCotizacionComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { cotizacionId: cotizacionId}
    });
  }

  openNuevoServicioModal(cotizacionId: string): void {
    this.dialogRef10 = this.dialog.open(ModalDetalleServicioComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: false,
      data: { cotizacionId: cotizacionId}
    });
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
}
