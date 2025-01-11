import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockService } from '../../../services/stock.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-actualizar-stock-inventario',
  templateUrl: './actualizar-stock-inventario.component.html',
  styleUrls: ['./actualizar-stock-inventario.component.css']
})
export class ActualizarStockInventarioComponent implements OnInit {

  stockId = 0;
  stock:any;

  constructor(private ModalService:ModalService,@Inject(MAT_DIALOG_DATA) public data: any,
              private StockService:StockService ) { }

  ngOnInit(): void {
    this.stockId = this.data.stockId;
    this.StockService.obtenerStock(this.stockId).subscribe(
      (data) => {
        this.stock = data;
        console.log(this.stock);
      },
      (error) => {
        console.log(error);
      }
    )
  }


  closeModal() {
    this.ModalService.cerrarActualizarStock();
  }

  actualizarDatos(){
      this.StockService.actualizarStock(this.stock).subscribe(
        (data) => {
          Swal.fire('Stock actualizado','Stock ha sido actualizado con éxito','success').then(() => {
            this.closeModal();
            window.location.reload();
          });
        },
        (error) => {
          Swal.fire('Error en el sistema','No se ha podido actualizar el stock','error');
          console.log(error);
        }
      )
    }

}
