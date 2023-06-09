import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { IClient } from '../models/client';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private db: AngularFireDatabase) { 
  }

  findAll(): Observable<IClient[]> {
    return this.db.list<IClient>('Clients').valueChanges();
  }

  findByNumber(number: string): Observable<IClient | null> {
    return this.db.object<IClient>(`Clients/${number}`).valueChanges();
  }

  create(client: IClient){
    let clientRef = this.db.object(`Clients/${client.coordonnees.tel}`);
    clientRef.set(client).then(() => {
      console.log('Client ajouté avec succès');
    }).catch(error => {
      console.log(error);
    });
  }

  delete(clientNumber: string){
    this.db.list(`Clients`).remove(clientNumber);
  }
}
