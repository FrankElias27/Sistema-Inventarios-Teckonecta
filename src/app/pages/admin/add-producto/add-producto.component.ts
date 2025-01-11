import { Router } from '@angular/router';
import { ProductoService } from './../../../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent implements OnInit {


  categorias:any = [];
  productoData = {
    nombre:'',
    codigo:'',
    descripcion:'',
    costoCompraUSD: 0,
    categoria:{
      categoriaId:''
    }
  }
  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  constructor(
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    private productoService:ProductoService,
    private router:Router,
    private ModalService:ModalService) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },(error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar los datos','error');
      }
    )
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const fileSizeInKB = this.selectedFile.size / 1024; // Convertir a KB

      if (fileSizeInKB > 50) {
        Swal.fire(
          'Error',
          'El tamaño del archivo debe ser menor de 50 KB.',
          'warning'
        );
        this.selectedFile = null;
        this.selectedFileName = null;
      } else {
        this.selectedFileName = this.selectedFile.name;
      }
    }
  }

  closeModal() {
    this.ModalService.cerrarAddProducto();
  }

  guardarCuestionario() {
    console.log(this.productoData);
    if (this.productoData.nombre.trim() == '' || this.productoData.nombre == null) {
      this.snack.open('El nombre es requerido', '', {
        duration: 3000
      });
      return;
    }

    if (this.productoData.codigo.trim() == '' || this.productoData.codigo == null) {
      this.snack.open('El código es requerido', '', {
        duration: 3000
      });
      return;
    }

    if (this.productoData.descripcion.trim() == '' || this.productoData.descripcion == null) {
      this.snack.open('La descripción es requerida', '', {
        duration: 3000
      });
      return;
    }

    if (!this.productoData.costoCompraUSD || isNaN(this.productoData.costoCompraUSD) || this.productoData.costoCompraUSD <= 0) {
      this.snack.open('El precio de compra es requerido y debe ser un número positivo', '', {
        duration: 3000
      });
      return;
    }



    // Validar que se haya seleccionado una categoría
    if (!this.productoData.categoria || !this.productoData.categoria.categoriaId) {
      this.snack.open('La categoría es requerida', '', {
        duration: 3000
      });
      return;
    }

    // Verificar si se ha seleccionado una imagen
    if (!this.selectedFile) {
      Swal.fire('Error', 'Debe seleccionar una imagen para el producto', 'error');
      return;
    }

    // Llamar al servicio para guardar el producto y la imagen
    this.productoService.guardarProducto(this.productoData, this.selectedFile).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Producto guardado', 'El producto ha sido guardado con éxito', 'success').then(() => {
          this.closeModal();
          window.location.reload(); // Recargar la página o puedes redirigir a otra ruta
        });
      },
      (error) => {
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
    )
  }
}
