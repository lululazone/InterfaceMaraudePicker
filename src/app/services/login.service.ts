import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedIn$.asObservable();
  constructor() { }
  setLogin(isLoggedIn: boolean) {
    this.isLoggedIn$.next(isLoggedIn);
  }


}
