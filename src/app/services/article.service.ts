import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, filter } from 'rxjs';
import { IArticle } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private db: AngularFireDatabase) { }

  findAll(): Observable<IArticle[]>{
    return this.db.list<IArticle>('Articles').valueChanges();
  }

  findById(id: string, category: string): Observable<IArticle | null>{
    return this.db.object<IArticle>(`Articles/${category}/${id}`).valueChanges();
  }

  findByCategory(category: string): Observable<IArticle[]>{
    return this.db.list<IArticle>(`Articles/${category}`).valueChanges();
  }

  create(article: IArticle, category: string){
    this.db.list(`/Articles/${category}`).push(article);
  }

  delete(id: string, category: string){
    this.db.list(`Articles/${category}`).remove(id);
  }
}
