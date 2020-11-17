import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private apiService: ApiService) {}

  add(slug, payload): Observable<Comment> {
    return this.apiService
      .post('/articles/' + slug + '/comments', { comment: { body: payload } })
      .pipe(map((d) => d.comment));
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get('/articles/' + slug + '/comments').pipe(map((d) => d.comment));
  }

  destroy(commentId, slug) {
    return this.apiService.delete('/articles/' + slug + '/comments/' + commentId);
  }
}
