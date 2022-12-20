import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SerieService } from 'src/app/modelos/serie.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulario-serie',
  templateUrl: './formulario-serie.component.html',
  styleUrls: ['./formulario-serie.component.css']
})
export class FormularioSerieComponent implements OnInit {
  datosSerie = this.fb.group({
    titulo: ['', Validators.required],
    director: ['', Validators.required],
    duracion: [0, Validators.required],
    genero: ['', Validators.required],
    
  });
  nueva: boolean = false;
  documentId: any;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private SeriesService: SerieService,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('hola soy formulario serie');
    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
        // mostrar la mascota en el formulario
        this.SeriesService.getSerie(this.documentId).subscribe(
          (resp: any) => {
            this.datosSerie.setValue(resp.payload.data());
          }
        )
      }else{
        console.log('nueva');
        this.nueva=true;
      }
    })
  }
  guardar() {
    if(this.nueva){
      // guardar datos con crearMascota
      this.SeriesService.createSerie(this.datosSerie.value).then(
        () => {
          alert('Serie creada, enhorabuena');
          this.cancel();
        }, (error: any) => {
          alert("Error: " + error);
        }
      )
    }else{
      // llamar o invocar actualizar mascota
      this.SeriesService.updateSerie(this.documentId, this.datosSerie.value).then(
        () => {
          alert('Serie actualizada');
          this.cancel();
        },
        (error: any) => {
          alert('Error: ' + error);
        }
      )
    }
  }
  cancel() {
    this.location.back();
  }


}
