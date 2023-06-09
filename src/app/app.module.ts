import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiDropdownModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TuiLinkModule} from '@taiga-ui/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FicheContactComponent } from './fiche-contact/fiche-contact.component';
import { HeaderComponent } from './header/header.component';
import { MainComponentComponent } from './main-component/main-component.component';
import {TuiElementModule, TuiForModule} from "@taiga-ui/cdk";
import {TuiTablePaginationModule} from "@taiga-ui/addon-table";
import { ItemComponent } from './item/item.component';
import {TuiInputCountModule, TuiPaginationModule, TuiSelectModule} from "@taiga-ui/kit";
import { LoginComponent } from './login/login.component';
import { LoginPageComponent } from './login-page/login-page.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    FicheContactComponent,
    HeaderComponent,
    MainComponentComponent,
    ItemComponent,
    LoginComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    TuiLinkModule,
    TuiDropdownModule,
    TuiButtonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiElementModule,
    TuiTablePaginationModule,
    TuiForModule,
    TuiSelectModule,
    TuiInputCountModule,
    TuiPaginationModule

  ],

  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
