import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  private itemList$ = new BehaviorSubject<any>({});
  selecteditemList$ = this.itemList$.asObservable();

  constructor() { }

  setProduct(itemList: any) {
    this.itemList$.next(itemList);
  }
}
