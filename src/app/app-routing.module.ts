import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FicheContactComponent} from "./fiche-contact/fiche-contact.component";
import {AppComponent} from "./app.component";
import {MainComponentComponent} from "./main-component/main-component.component";
import {LoginComponent} from "./login/login.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  { path: 'about', component:FicheContactComponent },
  { path: '', component:MainComponentComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'admin', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
