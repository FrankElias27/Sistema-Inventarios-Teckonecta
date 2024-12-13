import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentaService } from 'src/app/services/venta.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DetalleVentaService } from 'src/app/services/detalle-venta.service';

@Component({
  selector: 'app-add-ventas',
  templateUrl: './add-ventas.component.html',
  styleUrls: ['./add-ventas.component.css']
})
export class AddVentasComponent implements OnInit {

  // Datos de la venta
  ventaData = {
    cliente: '',
    fechaVenta: '',
    numTotaldeDetalleVenta: '',
    totalaPagar: '',
    activo: true,
  };

  // Datos del Detalle venta
  DetalleData = {
    cantidad: 0,
    subtotal:0,
    producto:{
      productoId:''
    },
    venta:{
      ventaId:''
    }
  };

  // Control para el formulario de búsqueda de productos
  productoControl = new FormControl();
  productos: any[] = []; // Aquí se almacenarán los productos obtenidos del servicio
  productoData: any; // Variable para almacenar el producto seleccionado

  // Detalle de la venta
  DetalleVenta = {
    cantidad: 0,
  };

  detallesVenta: any[] = []; // Array para almacenar los detalles de venta
  displayedColumns: string[] = ['producto', 'cantidad', 'precioUnitario', 'subtotal'];
  ventaActiva: boolean = false; // Controla la visibilidad del detalle de venta

  filteredProductos!: Observable<any[]>; // Observable para los productos filtrados

  constructor(
    private productoService: ProductoService,
    private snack: MatSnackBar,
    private ventaService: VentaService,
    private detalleventaService: DetalleVentaService,
  ) { }

  ngOnInit(): void {
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

  // Método para activar el detalle de venta
  

  // Método para añadir un producto al detalle de venta
  addToVentas() {
    if (this.productoData && this.DetalleVenta.cantidad > 0) {
      const subtotal = this.DetalleVenta.cantidad * this.productoData.precioVenta;
      const detalle = {
        producto: this.productoData,
        cantidad: this.DetalleVenta.cantidad,
        subtotal: subtotal,
        venta:{
          ventaId:''
        }
      };

      this.detallesVenta.push(detalle );
      this.detallesVenta = [...this.detallesVenta]; // Actualiza la referencia del array para refrescar la tabla
    } else {
      Swal.fire('Error !!', 'Debe seleccionar un producto y especificar una cantidad válida.', 'error');
    }
  }

  // Método para reiniciar el formulario de selección de producto y cantidad
  resetForm() {
    this.productoData = null;
    this.DetalleVenta.cantidad = 0;
  }

  // Método para guardar la venta
  guardarVenta() {
    console.log(this.ventaData);
    if (this.ventaData.cliente.trim() == '' || this.ventaData.cliente == null) {
      this.snack.open('El título es requerido', '', {
        duration: 3000
      });
      return;
    }

    this.ventaService.agregarVentas(this.ventaData).subscribe(
      (ventaCreada) => {
        console.log(ventaCreada);

        this.detallesVenta.forEach(detalle => {
          detalle.venta.ventaId = ventaCreada; // Asigna el id de la venta guardada a cada detalle de venta
       

        this.detalleventaService.guardarDetalleVenta(detalle).subscribe(
          (data) => {
            console.log('Detalle de venta guardado:', data);
          },
          (error) => {
            console.error('Error al guardar detalle de venta:', error);
          }
        );
      });

        Swal.fire('Venta guardada', 'Continue con el Registro del Detalle de Venta', 'success');
        // Activa el detalle de venta después de guardar
      },
      (error) => {
        Swal.fire('Error', 'Error al guardar el pedido', 'error');
      }
    );
  }

  // Método para mostrar el nombre del producto en el campo de búsqueda
  displayFn(producto: any): string {
    return producto && producto.nombre ? producto.nombre : '';
  }

}