import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Serie } from 'src/app/modelos/serie';
import { SerieService } from 'src/app/modelos/serie.service';

@Component({
  selector: 'app-lista-serie',
  templateUrl: './lista-serie.component.html',
  styleUrls: ['./lista-serie.component.css']
})
export class ListaSerieComponent implements OnInit {
  listaSerie: Serie[] = [];
  selectedSerie?: Serie;


  constructor(
    private serieService: SerieService,
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
    this.serieService.getGenero(genero).subscribe((resp: any) => {
      this.cargaLista(resp);
    });
  }

  getAll() {
    this.serieService.getAll().subscribe((resp: any) => {
      this.cargaLista(resp);
    });
  }

  cargaLista(resp: any) {
    this.listaSerie = [];
    resp.forEach((pelicula: any) => {
      this.listaSerie.push({
        id: pelicula.payload.doc.id,
        data: pelicula.payload.doc.data(),
      });
    });
  }


  selectSerie(serie: Serie) {
    this.selectedSerie = serie;
  }


}
