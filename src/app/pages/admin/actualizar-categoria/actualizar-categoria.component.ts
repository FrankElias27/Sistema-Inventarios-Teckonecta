import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-actualizar-categoria',
  templateUrl: './actualizar-categoria.component.html',
  styleUrls: ['./actualizar-categoria.component.css']
})
export class ActualizarCategoriaComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private categoriaService:CategoriaService,
    private router:Router,
    private ModalService:ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  categoriaId = 0;
  categoria:any;

  ngOnInit(): void {
    this.categoriaId = this.data.categoriaId;
    this.categoriaService.obtenerCategorias(this.categoriaId).subscribe(
      (data) => {
        this.categoria = data;
        console.log(this.categoria);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  closeModal() {
    this.ModalService.cerrarActualizarCategoria();
  }

  actualizarDatos(){
    this.categoriaService.actualizarCategoria(this.categoria).subscribe(
      (data) => {
        Swal.fire('Categoría actualizada','Categoría ha sido actualizada con éxito.','success').then(() => {
          this.closeModal();
          window.location.reload();
        });
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar la categoría','error');
        console.log(error);
      }
    )
  }
}
