import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ListaPeliculaComponent } from './vistas/lista-pelicula/lista-pelicula.component';
import { DetallePeliculaComponent } from './vistas/detalle-pelicula/detalle-pelicula.component';
import { FormularioPeliculaComponent } from './vistas/formulario-pelicula/formulario-pelicula.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaSerieComponent } from './vistas/lista-serie/lista-serie.component';

import { FormularioSerieComponent } from './vistas/formulario-serie/formulario-serie.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaPeliculaComponent,
    DetallePeliculaComponent,
    FormularioPeliculaComponent,
    ListaSerieComponent,
    FormularioSerieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
