import { ArticleResolverService } from './article-resolver.service';
import { SharedModule } from './../shared/shared.module';
import { MarkdownPipe } from './markdown.pipe';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { RouterModule } from '@angular/router';

const articleRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild(
  [
    {
      path: 'article/:slug',
      component: ArticleComponent,
      resolve: {
        article: ArticleResolverService
      }
    }
  ]
)

@NgModule({
  declarations: [ArticleComponent, MarkdownPipe],
  imports: [CommonModule, SharedModule, articleRouting],
})
export class ArticleModule {}
