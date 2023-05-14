import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiDropdownModule, TuiExpandModule
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
import {TuiElementModule, TuiForModule, TuiLetModule} from "@taiga-ui/cdk";
import {TuiTablePaginationModule} from "@taiga-ui/addon-table";
import { TuiTableModule } from "@taiga-ui/addon-table";
import { ItemComponent } from './item/item.component';
import {
  TuiElasticContainerModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiInputPasswordModule, TuiInputPhoneModule,
  TuiPaginationModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import { LoginPageComponent } from './login-page/login-page.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
// import { PageAdminComponent } from './page-admin/page-admin.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UpdateUserComponent } from './update-user/update-user.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MailService} from "./services/mail.service";


@NgModule({
  declarations: [
    AppComponent,
    FicheContactComponent,
    HeaderComponent,
    MainComponentComponent,
    ItemComponent,
    LoginPageComponent,
    // PageAdminComponent,
    AdminPageComponent,
    UpdateUserComponent
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
    TuiLetModule,
    TuiSelectModule,
    TuiInputCountModule,
    TuiPaginationModule,
    TuiInputPasswordModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiInputPhoneModule,
    TuiElasticContainerModule,
    TuiExpandModule,
    FormsModule,
    HttpClientModule,
    TuiTableModule,
    FormsModule

  ],




  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},MailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
