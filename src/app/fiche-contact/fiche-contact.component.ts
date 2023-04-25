import { Component, OnInit } from '@angular/core';
import {ItemListService} from "../services/item-list.service";

@Component({
  selector: 'app-fiche-contact',
  templateUrl: './fiche-contact.component.html',
  styleUrls: ['./fiche-contact.component.scss']
})
export class FicheContactComponent implements OnInit {

  constructor(private itemListService: ItemListService) { }
  selecteditemList: any;
  ngOnInit(): void {
    this.itemListService.selecteditemList$.subscribe((value: any) => {
      //recupère la liste des items sélectionnés
      this.selecteditemList = value;
      console.log(this.selecteditemList);
    });
  }

}
