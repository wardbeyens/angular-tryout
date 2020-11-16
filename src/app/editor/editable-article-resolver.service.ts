import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './../shared/services/user.service';
import { ArticlesService } from './../shared/services/articles.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Article } from '../shared/models/article.model';

@Injectable({
  providedIn: 'root',
})
export class EditableArticleResolverService implements Resolve<Article> {
  constructor(private articlesService: ArticlesService, private router: Router, private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articlesService.get(route.params['slug']).pipe(
      map((article) => {
        if (this.userService.getCurrentUser().username === article.author.username) {
          return article;
        } else {
          this.router.navigateByUrl('/');
        }
      }),
      catchError((err) => this.router.navigateByUrl('/'))
    );
  }
}
