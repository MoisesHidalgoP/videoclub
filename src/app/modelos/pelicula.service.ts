import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  conexion: any = this.firebase.collection('peliculas');

  constructor(private firebase: AngularFirestore) { }
  getAll() {
    return this.conexion.snapshotChanges();
  }
  getGenero(genero: string) {
    return this.firebase.collection('peliculas',
           ref => ref.where('genero','==', genero))
           .snapshotChanges();
  }
  getPelicula(documentId: string) {
    return this.conexion.doc(documentId).snapshotChanges();
  }

  createPelicula(data: any) {
    return this.conexion.add(data);
  }

  updatePelicula(documentId: string, data: any) {
    return this.conexion.doc(documentId).update(data);
  }

  deletePelicula(documentId: string){
    return this.conexion.doc(documentId).delete();
  }
}
