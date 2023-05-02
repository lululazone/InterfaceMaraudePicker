import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import {LoginService} from "../services/login.service";
import {TuiAlertService} from "@taiga-ui/core";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {



  textError !: string;

  readonly testForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(@Inject(LoginService) private readonly logged: LoginService) {
    this.logged.isLoggedIn.subscribe((value: boolean) => {
      if(value){
        window.location.href='/admin';
      }
    });
  }

  ngOnInit(): void {
  }

  public sendCredentials(): void{
    if(this.testForm.value.username == ''){
      this.textError = 'Veuillez renseigner un nom d\'utilisateur';
      return;
    }
    else if(this.testForm.value.password == ''){
      this.textError = 'Veuillez renseigner un mot de passe';
      return;
    }
   if(this.testForm.value.username === 'admin' && this.testForm.value.password === 'admin') {
     window.location.href='/admin';
     this.logged.setLogin(true);
   }
   else{
      this.textError = 'Nom d\'utilisateur ou mot de passe incorrect';
   }
  }

}
