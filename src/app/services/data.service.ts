import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { IClient } from '../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private clientTest: IClient = {
    firstname: "Prénom",
    lastname: "Nom",
    mail: "mail@test.fr",
    tel: "0612345678"
  }

  constructor(private db: AngularFireDatabase) { 
  }

  addClient(){
    let itemRef = this.db.list('Clients');
    itemRef.push(this.clientTest);
  }

  getClients(): Observable<IClient[]> {
    return this.db.list<IClient>('Clients').valueChanges();
  }
}
