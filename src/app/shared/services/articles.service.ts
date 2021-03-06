import { HttpParams } from '@angular/common/http';
import { ArticleListConfig } from './../models/article-list-config.model';
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

  destroy(slug) {
    return this.ApiService.delete('/articles/' + slug);
  }

  favorite(slug, favorite: boolean): Observable<Article> {
    if (favorite) {
      return this.ApiService.post('/articles/' + slug + '/favorite').pipe(map((d) => d.article));
    } else {
      return this.ApiService.delete('/articles/' + slug + '/favorite').pipe(map((d) => d.article));
    }
  }

  // unfavorite(slug): Observable<Article> {
  //   return this.ApiService.delete('/articles/' + slug + '/favorite');
  // }

  query(config: ArticleListConfig): Observable<{ articles: Article[]; articlesCount: number }> {
    const params = {};

    Object.keys(config.filters).forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.ApiService.get(
      '/articles' + (config.type === 'feed' ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }
}
