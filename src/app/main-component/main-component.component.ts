import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ItemComponent} from "../item/item.component";
import {TuiAlertService} from "@taiga-ui/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponentComponent implements OnInit {
  page = 0;
  size = 10;
  total = 237;
  open = false;
  currentPage = 0;

  selectionned = "none";

  displayedItems!: any[];

  pageSize = 14;

  numberPage = Math.round(this.total/this.pageSize);

  activePadding = 2;


  readonly testForm = new FormGroup({
    testValue1: new FormControl(10, Validators.required),

  });

  itemList: Array<{name: string, added:boolean,quantity:number,id:number}> = [];


  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {

  }


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
    this.selectionned = type;
    for (let i = 0; i < this.total; i++) {
      let item = {
        name: type + ' ' + i,
        added: false,
        quantity: 0,
        id: i,
      };
      this.itemList.push(item);
    }
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
  }

  public onClickItem(itemName:string):void{
    this.alerts
      .open(itemName+' ajouté !', {label: 'Panier mis à jour !'})
      .subscribe();

    console.log(this.testForm.value)
  }

  public loadList(value:string){
    this.itemList = [];
    this.initiateList(value);
  }

}
