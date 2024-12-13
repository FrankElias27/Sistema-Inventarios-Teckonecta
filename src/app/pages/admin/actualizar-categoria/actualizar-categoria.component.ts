import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-categoria',
  templateUrl: './actualizar-categoria.component.html',
  styleUrls: ['./actualizar-categoria.component.css']
})
export class ActualizarCategoriaComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private categoriaService:CategoriaService,
    private router:Router) { }

  categoriaId = 0;
  categoria:any;

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.params['categoriaId'];
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

  public actualizarDatos(){
    this.categoriaService.actualizarCategoria(this.categoria).subscribe(
      (data) => {
        Swal.fire('Categoria actualizada','Categoria ha sido actualizada con éxito','success').then(
          (e) => {
            this.router.navigate(['/admin/categorias']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar la categoria','error');
        console.log(error);
      }
    )
  }
}
