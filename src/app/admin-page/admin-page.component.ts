import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClientService } from '../services/client.service';

interface Client {
  nom: string;
  email: string;
  tel: string;
  items: string[];
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {

  clients: Client[] = [{nom: 'test', email:'test', tel:'test', items: ['test']}];
  columns = ['nom', 'email', 'tel', 'items'];

  constructor(private clientService: ClientService
              , private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.clientService.findAll().subscribe({
      next: (clients) => {
        clients.forEach(client => {
          let newClient: Client = {
            nom: client.coordonnees.firstname,
            email: client.coordonnees.mail,
            tel: client.coordonnees.tel,
            items: client.items.map((item) => `${item.nom} x ${item.quantite}`)            
          }
          this.clients.push(newClient);
          this.cdr.detectChanges();
        }); 
      }
    });
  }
}
