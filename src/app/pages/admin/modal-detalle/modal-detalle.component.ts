import { Component, OnInit,Inject } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { startWith, map } from 'rxjs/operators';
import { ModalService } from 'src/app/services/modal.service';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewDetalleComponent } from '../view-detalle/view-detalle.component';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.css']
})
export class ModalDetalleComponent implements OnInit {

  productos: any[] = [];
  productoData: any;
  productoControl = new FormControl();
  filteredProductos!: Observable<any[]>;
  ventaId:any;
  cliente:any;

  DetalleData:any = {
    cantidad:'',
    costoUnitario:'',
    tipodeCambio:'',
    utilidad:'',
    subtotal:'',
    producto:{
      productoId:''
    },
    venta:{
      ventaId:''
    }
  }

  constructor(private productoService: ProductoService,private modalService:ModalService,private snack: MatSnackBar,
    private detalleVentaService:DetalleVentaService,private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) public datas: any,
  public dialogRef: MatDialogRef<ViewDetalleComponent>,
  private dialogRef2: MatDialogRef<ModalDetalleComponent>) { console.log(datas);}

  ngOnInit(): void {
    this.ventaId = this.datas.ventaId;
    this.cliente = this.route.snapshot.params['cliente'];
    this.DetalleData.venta['ventaId'] = this.ventaId;
    // Método que se ejecuta al iniciar el componente
    // Obtener la lista completa de productos al iniciar el componente

    this.productoService.listarProductoDetalle().subscribe(
      (datos: any[]) => {
        this.productos = datos;
      },
      (error) => {
        console.log(error);
        // Manejo de errores si es necesario
      }
    );

    // Configurar el filtro para el autocompletado
    this.filteredProductos = this.productoControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.nombre), // Nombre del producto
      map(nombre => nombre ? this._filterProductos(nombre) : this.productos.slice())
    );
  }

  private _filterProductos(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();
    return this.productos.filter(producto => producto.nombre.toLowerCase().includes(filterValue));
  }

  displayFn(producto: any): string {
    return producto && producto.nombre ? producto.nombre : '';
  }

  closeModal(): void {
    this.dialogRef2.close();  // Cierra el modal
  }

  GuardarDetalle() {
    // Obtener el producto seleccionado del autocompletado
    const productoSeleccionado = this.productoControl.value;

    // Verificar que productoSeleccionado tenga los datos necesarios
    if (!productoSeleccionado || !productoSeleccionado.costoCompraUSD) {
      this.snack.open('Producto seleccionado incompleto o inválido', '',{
        duration: 3000
      });
      return;
    }

    // Verificar que haya ingresado una cantidad válida
    if (!this.DetalleData.cantidad || this.DetalleData.cantidad <= 0) {
      this.snack.open('Cantidad de producto inválida', '',{
        duration: 3000
      });
      return;
    }


    this.DetalleData.costoUnitario = (((productoSeleccionado.costoCompraUSD*1.18)*this.DetalleData.tipodeCambio)/(1-(this.DetalleData.utilidad/100))).toFixed(2);;
    
    // Calcular el subtotal
    const subtotal = this.DetalleData.cantidad * this.DetalleData.costoUnitario;

    // Asignar valores al objeto DetalleData
    this.DetalleData.producto.productoId = productoSeleccionado.productoId;
    this.DetalleData.subtotal = subtotal.toFixed(2);

    console.log('Detalle a guardar:', this.DetalleData);

    // Llamar al servicio para guardar el detalle de venta
    this.detalleVentaService.guardarDetalleVenta(this.DetalleData).subscribe(
      (data) => {
        Swal.fire('Producto guardado', 'El producto ha sido agregado con éxito', 'success').then(
          (e) => {
            this.dialogRef.close('actualizar');
          });
        // Puedes hacer otras acciones después de guardar exitosamente
      },
      (error) => {
        Swal.fire('Error', 'Error al guardar el producto en la base de datos', 'error');
        console.error('Error al guardar el detalle de venta:', error);
      }
    );
  }
}
