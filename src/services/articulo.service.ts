import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Articulo } from '../model/articulo';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  private articulos: Articulo[] = [];

  getArticulos(): Observable<Articulo[]> {
    return of(this.articulos);
  }

  agregarArticulo(articulo: Articulo): void {
    this.articulos.push(articulo);
  }

  actualizarArticulo(articuloActualizado: Articulo): void {
    const index = this.articulos.findIndex(
      (articulo) => articulo.codigo === articuloActualizado.codigo
    );

    if (index !== -1) {
      this.articulos[index] = articuloActualizado;
    }
  }

  eliminarArticulo(codigo: string): void {
    this.articulos = this.articulos.filter((articulo) => articulo.codigo !== codigo);
  }
}
