import  Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { ProductoService } from './../../../services/producto.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private productoService:ProductoService,
    private categoriaService:CategoriaService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private ModalService:ModalService) { }

  productoId = 0;
  producto:any;
  categorias:any;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  ngOnInit(): void {
    this.productoId = this.data.productoId;
    this.productoService.obtenerProductos(this.productoId).subscribe(
      (data) => {
        this.producto = data;
        console.log(this.producto);
      },
      (error) => {
        console.log(error);
      }
    )

    this.categoriaService.listarCategorias().subscribe(
      (data:any) => {
        this.categorias = data;
      },
      (error) => {
        alert('Error al cargar las categorías');
      }
    )
  }

  closeModal() {
    this.ModalService.cerrarActualizarProducto();
  }

  actualizarDatos(): void {
    if (this.selectedFile) {
      this.productoService.actualizarProducto(this.producto, this.selectedFile).subscribe({
        next: (response) => {

          Swal.fire('Producto actualizado', 'Producto ha sido actualizado con éxito', 'success').then(() => {
                    this.closeModal();
                    window.location.reload();
                  });

        },
        error: (error) => {
          if (error.status === 400) {
                    // Si es un error de cliente existente
                    Swal.fire('Error', error.error, 'error');
                  } else if (error.status === 404) {
                    // Si el cliente no fue encontrado
                    Swal.fire('Error', error.error, 'error');
                  } else if (error.status === 500) {
                    // Si es un error inesperado
                    Swal.fire('Error', error.error || 'Error inesperado al actualizar el cliente.', 'error');
                  } else {
                    // Manejar otros errores
                    Swal.fire('Error en el sistema', 'No se ha podido actualizar el cliente', 'error');
                  }
                  console.log(error);
        }
      });
    } else {
      // Si no se seleccionó una imagen, puedes llamar al servicio sin ella
      this.productoService.actualizarProducto(this.producto, null).subscribe({
        next: (response) => {
          Swal.fire('Producto actualizado', 'Producto ha sido actualizado con éxito', 'success').then(() => {
            this.closeModal();
            window.location.reload();
          });
        },
        error: (error) => {
          if (error.status === 400) {
                    // Si es un error de cliente existente
                    Swal.fire('Error', error.error, 'error');
                  } else if (error.status === 404) {
                    // Si el cliente no fue encontrado
                    Swal.fire('Error', error.error, 'error');
                  } else if (error.status === 500) {
                    // Si es un error inesperado
                    Swal.fire('Error', error.error || 'Error inesperado al actualizar el cliente.', 'error');
                  } else {
                    // Manejar otros errores
                    Swal.fire('Error en el sistema', 'No se ha podido actualizar el cliente', 'error');
                  }
                  console.log(error);
        }
      });
    }
  }

  // Método para capturar el archivo de imagen seleccionado
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const fileSizeInKB = this.selectedFile.size / 1024; // Convertir tamaño a KB

      // Verificar si el archivo supera el tamaño permitido (50 KB)
      if (fileSizeInKB > 50) {
        Swal.fire(
          'Error',
          'El tamaño del archivo debe ser menor de 50 KB.',
          'warning'
        );
        this.selectedFile = null;
        this.selectedFileName = null;
      } else {
        // Si el archivo es válido, establecer el nombre del archivo
        this.selectedFileName = this.selectedFile.name;
      }
    }
  }

}

