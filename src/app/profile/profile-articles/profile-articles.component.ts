import { Component, OnInit } from '@angular/core';
import { ArticleListConfig } from 'src/app/shared/models/article-list-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/shared/models/profile.model';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.scss'],
})
export class ProfileArticlesComponent implements OnInit {
  profile: Profile;
  articlesConfig: ArticleListConfig = new ArticleListConfig();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.parent.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
      this.articlesConfig.filters.author = this.profile.username;
    });
  }
}
