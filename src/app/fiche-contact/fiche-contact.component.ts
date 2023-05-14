import { Component, OnInit } from '@angular/core';
import {ItemListService} from "../services/item-list.service";
import {tuiArrayRemove} from "@taiga-ui/cdk";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Email, MailService} from "../services/mail.service";

@Component({
  selector: 'app-fiche-contact',
  templateUrl: './fiche-contact.component.html',
  styleUrls: ['./fiche-contact.component.scss']
})
export class FicheContactComponent implements OnInit {


  FormData: any;


  constructor(private itemListService: ItemListService,private mail: MailService,private builder: FormBuilder) { }
  selecteditemList: any;
  items : Array<{nom: string, qte:any}> = [];

  clicked = false;
  name !: string;
  phoneNumber!:string;

  mailSender !: string;

  isSend = false;
  email: Email = {
    name: '',
    email: '',
    tel: '',
    subject: "Liste d'aliments et de produit d'hygiène",
    message: ''
  };




  ngOnInit(): void {
    this.itemListService.selecteditemList$.subscribe((value: any) => {
      //recupère la liste des items sélectionnés
      this.selecteditemList = value;
      console.log(this.selecteditemList);
    });

    this.items= this.selecteditemList;
  }

  remove(index: number) {
    this.items = tuiArrayRemove(this.items, index);
  }


  onSubmit() {
    this.email.name = this.name;
    this.email.email = this.mailSender;
    this.email.message += "Telephone: "+this.phoneNumber+'\n';
    this.email.message += "Nom: "+this.name+'\n';
    this.email.message += "Email: "+this.mailSender+'\n';
    this.items.forEach((item: { qte: any; nom: any; }) => {
      this.email.message += `- ${item.qte} x ${item.nom}\n`;
    });
    this.mail.sendEmail(this.email)
      .subscribe(
        response => this.isSend=true,
        error => console.log(error)
      );
  }
}
