import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private ApiService: ApiService) {}

  get(slug): Observable<Article> {
    return this.ApiService.get('/articles/' + slug).pipe(map((data) => data.article));
  }

  save(article): Observable<Article> {
    if (article.slug) {
      return this.ApiService.put('/articles/' + article.slug, { article: article }).pipe(map((d) => d.article));
    } else {
      return this.ApiService.post('/articles', { article: article }).pipe(map((d) => d.article));
    }
  }

  destroy(slug){
    return this.ApiService.delete('/articles/' + slug)
  }

  favorite(slug): Observable<Article> {
    return this.ApiService.post('/articles/' + slug + '/favorite')
  }

  unfavorite(slug): Observable<Article> {
    return this.ApiService.delete('/articles/' + slug + '/favorite')
  }

}
