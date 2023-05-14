import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from '../services/client.service';
import { ArticleService } from '../services/article.service';
import { IArticle } from '../models/article';

interface Client {
  nom: string;
  email: string;
  tel: string;
  items: { nom: string; quantity: number; state: boolean }[];
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  columns = ['nom', 'email', 'tel', 'items'];
  private subscription!: Subscription;
  numero!: string;
  displayComponent: boolean = false;
  alimentaire: IArticle[] = [];
  hygiene: IArticle[] = [];

  newArticleAlimentaire: IArticle = {
    nom: "",
    image: ""
  };

  newArticleHygiene: IArticle = {
    nom: "",
    image: ""
  };

  constructor(private clientService: ClientService,
              private cdr: ChangeDetectorRef,
              private articleService: ArticleService) {}

  ngOnInit(): void {
    this.subscription = this.clientService.findAll().subscribe({
      next: (clients) => {
        this.clients = clients.map((client) => ({
          nom: `${client.coordonnees.firstname} ${client.coordonnees.lastname}`,
          email: client.coordonnees.mail,
          tel: client.coordonnees.tel,
          items: client.items.map((item) => ({
            nom: item.nom,
            quantity: item.quantite,
            state: item.state,
          })),
        }));
        this.cdr.detectChanges();
      },
    });

    this.articleService.findByCategory("alimentaire").subscribe({
      next: (data) => {
        this.alimentaire = data;
        console.log(this.alimentaire)
      }
    });
    this.articleService.findByCategory("hygiene").subscribe({
      next: (data) => {
        this.hygiene = data;
        console.log(this.hygiene)
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateStatus(client: Client, item: any) {
    this.clientService.updateArticleState(client.tel, item, true);
  }

  displayUpdateComponent(){
    this.displayComponent = true;
  }

  handleClose(value: boolean){
    this.displayComponent = value;
  }
  
  hygieneOnSubmit(){
    this.articleService.create(this.newArticleHygiene, "hygiene");
  }

  alimentaireOnSubmit(){
    this.articleService.create(this.newArticleAlimentaire, "hygiene");
  }
}