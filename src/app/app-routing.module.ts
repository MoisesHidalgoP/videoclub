import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioPeliculaComponent } from './vistas/formulario-pelicula/formulario-pelicula.component';
import { FormularioSerieComponent } from './vistas/formulario-serie/formulario-serie.component';
import { ListaPeliculaComponent } from './vistas/lista-pelicula/lista-pelicula.component';
import { ListaSerieComponent } from './vistas/lista-serie/lista-serie.component';


const routes: Routes = [
  { path: '', component: ListaPeliculaComponent },
  { path: 'listaPelicula', component: ListaPeliculaComponent },
  { path: 'nuevaPelicula', component: FormularioPeliculaComponent },
  { path: 'edit/:id', component: FormularioPeliculaComponent },
  { path: 'nuevaSerie', component: FormularioSerieComponent },
  { path: 'listaSerie', component: ListaSerieComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
