import { UserService } from './../../services/user.service';
import { ArticlesService } from './../../services/articles.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from '../../models/article.model';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent implements OnInit {
  @Input() article: Article;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(private articlesService: ArticlesService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    console.log('FavoriteButtonComponent');
    console.log(this.article);
  }

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated
      .pipe(
        concatMap((authenticated) => {
          // Not authenticated? Push to login screen
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            //dit moet niet
            return of(null);
          }

          // Favorite the article if it isn't favorited yet
          if (!this.article.favorited) {
            return this.articlesService.favorite(this.article.slug).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.onToggle.emit(true);
                },
                (err) => (this.isSubmitting = false)
              )
            );

            // Otherwise, unfavorite the article
          } else {
            return this.articlesService.unfavorite(this.article.slug).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.onToggle.emit(false);
                },
                (err) => (this.isSubmitting = false)
              )
            );
          }
        })
      )
      .subscribe();

      
  }
}
