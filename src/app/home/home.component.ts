import { ArticleListConfig } from './../shared/models/article-list-config.model';
import { UserService } from './../shared/services/user.service';
import { TagsService } from './../shared/services/tags.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  listConfig: ArticleListConfig = new ArticleListConfig();
  tags: string[] = [];
  tagsLoaded: boolean = false;

  constructor(private router: Router, private tagsService: TagsService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((authed) => {
      this.isAuthenticated = authed;

      if (authed) {
        this.setListTo('feed');
      } else {
        this.setListTo('all');
      }
    });

    this.tagsService.getAll().subscribe((tags) => {
      this.tags = tags;
      this.tagsLoaded = true;
    });
  }

  setListTo(type: string = '', filters: Object = {}) {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.listConfig = { type: type, filters: filters };
  }
}
