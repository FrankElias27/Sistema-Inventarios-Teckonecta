import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { ProductoService } from '../../../services/producto.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { InventarioService } from '../../../services/inventario.service';
import { StockService } from '../../../services/stock.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-existencia',
  templateUrl: './add-existencia.component.html',
  styleUrls: ['./add-existencia.component.css']
})
export class AddExistenciaComponent implements OnInit {

  productos: any[] = [];
  productoData: any;
  productoControl = new FormControl();
  filteredProductos!: Observable<any[]>;

  inventarios: any[] = [];
  filteredInventarios!: Observable<any[]>;
  inventarioControl = new FormControl();

  stockData = {
    inventario:{
      inventarioId:''
    },
    producto:{
      productoId:''
    },
    cantidad:0,
  }

  constructor(private ModalService:ModalService, private ProductoService:ProductoService
    ,private InventarioService:InventarioService, private StockService:StockService,
    private snack:MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.ProductoService.listarProductoDetalle().subscribe(
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

        this.InventarioService.listarInventarioDetalle().subscribe(
          (datos: any[]) => {
            this.inventarios = datos;
          },
          (error) => {
            console.log(error);
            // Manejo de errores si es necesario
          }
        );

        // Configurar el filtro para el autocompletado
            this.filteredInventarios = this.inventarioControl.valueChanges.pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.nombre), // Nombre del producto
              map(nombre => nombre ? this._filterInventarios(nombre) : this.inventarios.slice())
            );
  }

  private _filterProductos(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();
    return this.productos.filter(producto => producto.nombre.toLowerCase().includes(filterValue));
  }

  displayFn(producto: any): string {
    return producto && producto.nombre ? producto.nombre : '';
  }

  private _filterInventarios(nombre: string): any[] {
    const filterValue2 = nombre.toLowerCase();
    return this.inventarios.filter(inventario => inventario.nombre.toLowerCase().includes(filterValue2));
  }

  displayFn2(inventario: any): string {
    return inventario && inventario.nombre ? inventario.nombre : '';
  }

  closeModal():void{
   this.ModalService.cerrarAddExistencia()
  }

  GuardarDetalle() {
    const productoSeleccionado = this.productoControl.value;
    this.stockData.producto.productoId = productoSeleccionado.productoId;

    const inventarioSeleccionado = this.inventarioControl.value;
    this.stockData.inventario.inventarioId = inventarioSeleccionado.inventarioId;

    // Verificar que los campos del producto estén correctamente completados
    if (!this.stockData.inventario || !this.stockData.inventario.inventarioId) {
      this.snack.open('El inventario es requerido', '', {
        duration: 3000
      });
      return;
    }

    if (!this.stockData.producto || !this.stockData.producto.productoId) {
      this.snack.open('El producto es requerido', '', {
        duration: 3000
      });
      return;
    }

    if (!this.stockData.cantidad || isNaN(this.stockData.cantidad) || this.stockData.cantidad <= 0) {
      this.snack.open('La cantidad es requerida y debe ser un número positivo', '', {
        duration: 3000
      });
      return;
    }



    this.StockService.agregarStock(this.stockData).subscribe(
      (data) => {
        // Si la petición es exitosa
        Swal.fire('Producto guardado', 'El producto ha sido agregado con éxito', 'success').then(() => {
          this.closeModal();
          window.location.reload(); // Recargar la página o puedes redirigir a otra ruta
        });
      },
      (error) => {
        // Si ocurre un error, se maneja según el código de estado
        if (error.status === 400) {
          // Si el error es un Bad Request (400), mostrar el mensaje detallado enviado por el backend
          Swal.fire('Error', error.error, 'error'); // Mostrar el mensaje del backend
        } else if (error.status === 500) {
          // Si el error es un Internal Server Error (500), mensaje genérico para errores de servidor
          Swal.fire('Error', 'Error inesperado al guardar el producto. Por favor, intente más tarde.', 'error');
        } else {
          // Manejo genérico de otros errores
          Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error');
        }
      }
    );
  }

}
