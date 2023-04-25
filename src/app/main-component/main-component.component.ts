import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ItemComponent} from "../item/item.component";
import {TuiAlertService} from "@taiga-ui/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../services/article.service";
import {IArticle} from "../models/article";
import {Observable} from "rxjs";
import {TuiInputCountComponent} from "@taiga-ui/kit";
import { Router } from '@angular/router';
import {ItemListService} from "../services/item-list.service";

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponentComponent implements OnInit,IArticle {
  page = 0;
  size = 10;
  total = 10;
  open = false;
  currentPage = 0;

  selectionned = "none";

  displayedItems!: any[];

  pageSize = 14;

  numberPage = Math.round(this.total/this.pageSize);

  activePadding = 2;

  itemSelectedList: Array<{nom: string, qte:any}> = [];


  readonly testForm = new FormGroup({
    testValue1: new FormControl(10, Validators.required),
  });

  itemAvailableList: Array<{nom: string, image:string}> = [];
  AlimentAvailableList: Array<{nom: string, image:string}> = [];

  HygieneAvailableList: Array<{nom: string, image:string}> = [];

  itemList: Array<{name: string, added:boolean,quantity:number,id:number}> = [];


  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService, public articleService:ArticleService,private itemListService: ItemListService) {
    this.articleService.findByCategory('alimentaire').subscribe((res: IArticle[]) => {
        this.AlimentAvailableList=res;
      }
    )
    this.articleService.findByCategory('hygiene').subscribe((res: IArticle[]) => {
        this.HygieneAvailableList=res;
      }
    )

  }

  nom!: string;
  image!: string;


  ngOnInit(): void {
  }

  onClick(): void {
    this.open = !this.open;
  }

  onObscured(obscured: boolean): void {
    if (obscured) {
      this.open = false;
    }
  }

  onActiveZone(active: boolean): void {
    this.open = active && this.open;
  }


  public initiateList(type: string): void {
    this.itemList = []
    this.selectionned = type;
    if(type=='alimentaire'){
      this.itemAvailableList = this.AlimentAvailableList;
    }
    if(type=='hygiene'){
      this.itemAvailableList = this.HygieneAvailableList;
    }
    for(let i = 0 ; i<this.itemAvailableList.length;i++){
      let item = {
        name: this.itemAvailableList[i].nom,
        added: false,
        quantity: 0,
        id: i,
      };
      this.itemList.push(item);
    }
    this.currentPage=0;

    this.total = Math.floor(this.itemList.length/this.pageSize)

    console.log(this.itemList)

  }


  onPageChange(page: number) {
    const startIndex = (page) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedItems = this.itemList.slice(startIndex, endIndex);
    this.currentPage = page;
  }


  public onClickItemRemove(itemName:string):void{
    this.alerts
      .open(itemName+' enlevé :(', {label: 'Panier mis à jour !'})
      .subscribe();
    //remove item from list
    if(this.itemSelectedList.find((item)=>item.nom==itemName)){
      this.itemSelectedList.find((item)=>item.nom==itemName)!.qte=0;
      if(this.itemSelectedList.find((item)=>item.nom==itemName)!.qte==0){
        this.itemSelectedList = this.itemSelectedList.filter((item)=>item.nom!=itemName);
      }
      console.log(this.itemSelectedList);
      return;
    }

  }

  public onClickItem(itemName: string, qte: TuiInputCountComponent):void{
    this.alerts
      .open(itemName+' ajouté !', {label: 'Panier mis à jour !'})
      .subscribe();
    if(this.itemSelectedList.find((item)=>item.nom==itemName)){
      this.itemSelectedList.find((item)=>item.nom==itemName)!.qte+=qte.value;
      console.log(this.itemSelectedList);
      return;
    }
    this.itemSelectedList.push({nom:itemName,qte:qte.value})
    console.log(this.itemSelectedList);
  }

  public loadList(value:string){
    this.itemList = [];
    this.initiateList(value);
  }

  public onClickContinue(){
    this.itemListService.setProduct(this.itemSelectedList);
  }



}
