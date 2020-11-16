import { UserService } from './../shared/services/user.service';
import { ArticlesService } from './../shared/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { article: Article }) => {
      this.article = data.article;
    });

    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      this.canModify = this.currentUser.username === this.article.author.username;
    });
  }

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.destroy(this.article.slug).subscribe((succes) => {
      this.router.navigateByUrl('/');
    });
  }
}
