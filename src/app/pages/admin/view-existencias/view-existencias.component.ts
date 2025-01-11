import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import Swal from 'sweetalert2';
import { StockService } from '../../../services/stock.service';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from '../../../services/modal.service';


@Component({
  selector: 'app-view-existencias',
  templateUrl: './view-existencias.component.html',
  styleUrls: ['./view-existencias.component.css']
})
export class ViewExistenciasComponent implements OnInit {

  inventarios: any = [];
  selectedInventario: any;

  displayedColumns: string[] = ['IT.', 'Producto', 'Stock', 'Nivel', 'Acciones'];

  currentPage: number = 0;
  totalElements: number = 0;
  dataSource = new MatTableDataSource<any>();

  constructor(private InventarioService:InventarioService,private StockService:StockService,
    private ModalService:ModalService
  ) { }

  ngOnInit(): void {
    this.InventarioService.listarInventario().subscribe(
      (dato:any) => {
          this.inventarios = dato;
          console.log(this.inventarios);
                // Asignamos el primer inventario al seleccionar por defecto
        if (this.inventarios && this.inventarios.length > 0) {
          this.selectedInventario = this.inventarios[0]; // Asignamos el primer inventario
          this.visualizarInventarioStock(); // Llamamos la función para obtener el stock del primer inventario
        }
      },(error) => {
          console.log(error);
          Swal.fire('Error !!','Error al cargar los datos','error');
        }
        )
  }

  abrirAddExistencia(): void {
    this.ModalService.openAddExistencia();
  }

  visualizarInventarioStock(): void {

    if (this.selectedInventario && this.selectedInventario.inventarioId) {
      const inventarioId = this.selectedInventario.inventarioId;
      this.StockService.getInventarioStock(inventarioId, this.currentPage).subscribe(
        (response) => {
          console.log('Respuesta del Servicio Stock:', response);
          this.dataSource.data = response.content; // Almacena los InventarioStock
          this.totalElements = response.totalElements;
        },
        (error) => {
          console.error('Error al obtener los InventarioStock:', error);
        }
      );
    }
  }

  eliminarDetalle(stockId: any) {
      Swal.fire({
        title: 'Eliminar Stock',
        text: '¿Estás seguro de eliminar el Stock?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.StockService.eliminarStock(stockId).subscribe(
            (data) => {
              this.inventarios = this.inventarios.filter((detalles: any) => detalles.stockId !== stockId);
              Swal.fire('Stock eliminado', 'El stock ha sido eliminado de la base de datos', 'success').then(
                (e) => {
                  location.reload()
                });
            },
            (error) => {
              Swal.fire('Error', 'Error al eliminar el stock', 'error');
            }
          );
        }

      });
    }



}
