import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpClientModule} from '@angular/common/http';

export interface Email {
  name: string;
  email: string;

  tel: '',
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})


export class MailService {








  private url = "https://formsubmit.co/ajax/lucas.girard@ynov.com"
  constructor(private http: HttpClient){

  }

  sendEmail(email: Email): Observable<any> {
    const body = {
      name: email.name,
      email: email.email,
      subject: email.subject,
      message: email.message
    };

    return this.http.post(this.url, body);
  }
}
