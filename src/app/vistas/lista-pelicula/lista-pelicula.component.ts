import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pelicula } from 'src/app/modelos/pelicula';
import { PeliculaService } from 'src/app/modelos/pelicula.service';

@Component({
  selector: 'app-lista-pelicula',
  templateUrl: './lista-pelicula.component.html',
  styleUrls: ['./lista-pelicula.component.css']
})
export class ListaPeliculaComponent implements OnInit {
  listaPelicula: Pelicula[] = [];
  selectedPelicula?: Pelicula;

  constructor(
    private peliculasService: PeliculaService,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ruta.params.subscribe((params: any) => {
      if (params['genero']) {
        // LLamo a getEspecie
        this.getGenero(params['genero']);
      } else {
        this.getAll();
      }
    });
  }

  getGenero(genero: string) {
    this.peliculasService.getGenero(genero).subscribe((resp: any) => {
      this.cargaLista(resp);
    });
  }

  getAll() {
    this.peliculasService.getAll().subscribe((resp: any) => {
      this.cargaLista(resp);
    });
  }

  cargaLista(resp: any) {
    this.listaPelicula = [];
    resp.forEach((pelicula: any) => {
      this.listaPelicula.push({
        id: pelicula.payload.doc.id,
        data: pelicula.payload.doc.data(),
      });
    });
  }


  selectPelicula(pelicula: Pelicula) {
    this.selectedPelicula = pelicula;
  }

}
