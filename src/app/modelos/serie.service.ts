import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  conexion: any = this.firebase.collection('series');
  constructor(private firebase: AngularFirestore) { }
  getAll() {
    return this.conexion.snapshotChanges();
  }
  getGenero(genero: string) {
    return this.firebase.collection('peliculas',
           ref => ref.where('genero','==', genero))
           .snapshotChanges();
  }
  getSerie(documentId: string) {
    return this.conexion.doc(documentId).snapshotChanges();
  }

  createSerie(data: any) {
    return this.conexion.add(data);
  }

  updateSerie(documentId: string, data: any) {
    return this.conexion.doc(documentId).update(data);
  }

  deleteSerie(documentId: string){
    return this.conexion.doc(documentId).delete();
  }
}
