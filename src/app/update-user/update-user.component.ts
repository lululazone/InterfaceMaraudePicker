import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../services/client.service';
import { isEqual } from 'lodash';

interface Client {
  firstname: string,
  lastname: string;
  mail: string;
  tel: string;
}

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @Input() numero!: string;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();


  client: Client = {
    firstname: "",
    lastname: "",
    mail: "",
    tel: "",
  };

  originalClient: Client = {
    firstname: "",
    lastname: "",
    mail: "",
    tel: "",
  }

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.findByNumber(this.numero).subscribe({
      next: (client) => {
        this.client.firstname = client!.coordonnees.firstname;
        this.client.lastname = client!.coordonnees.lastname;
        this.client.mail = client!.coordonnees.mail;
        this.client.tel = client!.coordonnees.tel;
        
        this.originalClient.firstname = client!.coordonnees.firstname;
        this.originalClient.lastname = client!.coordonnees.lastname;
        this.originalClient.mail = client!.coordonnees.mail;
        this.originalClient.tel = client!.coordonnees.tel;
      }
    })
  }

  onSubmit(){
    if(isEqual(this.client, this.originalClient)){
      alert("Il n'y a pas eu de modifications sur le client.")
    } else {
      this.clientService.update(this.client);
      this.closeComponent();
    }
  }
  
  closeComponent() {
    this.close.emit(false);
  }
}
