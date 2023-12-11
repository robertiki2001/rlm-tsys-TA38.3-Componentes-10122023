import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Articulo } from '../../../model/articulo';
import { ArticuloService } from '../../../services/articulo.service';

@Component({
  selector: 'app-formulario-articulo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-articulo.component.html',
  styleUrls: ['./formulario-articulo.component.css'],
})
export class FormularioArticuloComponent implements OnInit {
  formulario: FormGroup;
  articulos: Articulo[] = [];
  articuloSeleccionado: Articulo | null = null;

  constructor(private fb: FormBuilder, private articuloService: ArticuloService) {
    this.formulario = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }
  
  ngOnInit(): void {
    this.formulario = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
    });

    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.articuloService.getArticulos().subscribe((articulos: Articulo[]) => {
      this.articulos = articulos;
    });
  }
  

  onSubmit(): void {
    if (this.formulario.valid) {
      const nuevoArticulo: Articulo = this.formulario.value;

      if (this.articuloSeleccionado) {
        // Si hay un artículo seleccionado, actualiza en lugar de agregar uno nuevo
        nuevoArticulo.codigo = this.articuloSeleccionado.codigo;
        this.articuloService.actualizarArticulo(nuevoArticulo);
        this.articuloSeleccionado = null;
      } else {
        this.articuloService.agregarArticulo(nuevoArticulo);
      }

      this.formulario.reset();
      this.cargarArticulos();
    }
  }

  editarArticulo(articulo: Articulo): void {
    this.formulario.setValue({
      codigo: articulo.codigo,
      descripcion: articulo.descripcion,
      precio: articulo.precio,
    });

    this.articuloSeleccionado = articulo;
  }

  actualizarArticulo(): void {
  }

  eliminarArticulo(codigo: string): void {
    this.articuloService.eliminarArticulo(codigo);
    this.cargarArticulos();
  }
}

