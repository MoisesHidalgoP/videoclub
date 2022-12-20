import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from 'src/app/modelos/pelicula.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {
  datosPelicula = this.fb.group({
    titulo: ['', Validators.required],
    director: ['', Validators.required],
    duracion: [0, Validators.required],
    genero: ['', Validators.required],
    
  });
  nueva: boolean = false;
  existe:boolean=true;
  documentId: any;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private PeliculasService: PeliculaService,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('hola soy formulario pelicula');
    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
        // mostrar la mascota en el formulario
        this.PeliculasService.getPelicula(this.documentId).subscribe(
          (resp: any) => {
            this.datosPelicula.setValue(resp.payload.data());
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
      this.PeliculasService.createPelicula(this.datosPelicula.value).then(
        () => {
          alert('Pelicula creada, enhorabuena');
          this.cancel();
        }, (error: any) => {
          alert("Error: " + error);
        }
      )
    }else{
      // llamar o invocar actualizar mascota
      this.PeliculasService.updatePelicula(this.documentId, this.datosPelicula.value).then(
        () => {
          alert('Pelicula actualizada');
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
  borrar(){
    if(this.existe){
      // borrar datos
      this.PeliculasService.deletePelicula(this.documentId).then(
        () => {
          alert('Serie borrada, enhorabuena');
          this.cancel();
        }, (error: any) => {
          alert("Error: " + error);
        }
      )
  }

}
}




