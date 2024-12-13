import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  public listarProductos(){
    return this.http.get(`${baserUrl}/productos/`);
  }

  public listarProductoDetalle(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/productos/`);
  }

  // Método para buscar productos por nombre
  public buscarProductosPorNombreDetalle(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/productos/buscarproducto?nombre=${nombre}`);
  }

  public buscarProductosPorNombre<T>(nombre: string, page: number, size: number): Observable<T> {
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<T>(`${baserUrl}/productos/buscar`, { params });
  }

  public getProductos(page: number): Observable<any> {
    return this.http.get(`${baserUrl}/productos/page/${page}`);
  }

  public agregarProductos(productos:any){
    return this.http.post(`${baserUrl}/productos/`,productos);
  }

  public eliminarProductos(productoId:any){
    return this.http.delete(`${baserUrl}/productos/${productoId}`);
  }

  public obtenerProductos(productoId:any){
    return this.http.get(`${baserUrl}/productos/${productoId}`);
  }

  public actualizarProductos(productos:any){
    return this.http.put(`${baserUrl}/productos/`,productos);
  }

  public listarProductosDeUnaCategoria(categoriaId:any){
    return this.http.get(`${baserUrl}/productos/categoria/${categoriaId}`);
  }

  public obtenerProductosActivos(){
    return this.http.get(`${baserUrl}/v/activo`);
  }

  public obtenerProductosActivosDeUnaCategoria(categoriaId:any){
    return this.http.get(`${baserUrl}/productos/categoria/activo/${categoriaId}`);
  }

  public actualizarProductos2(producto: any[]): Observable<any> {
    return this.http.put(`${baserUrl}/productos/`, producto);
  }
}
