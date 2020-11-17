import { ArticleResolverService } from './article-resolver.service';
import { SharedModule } from './../shared/shared.module';
import { MarkdownPipe } from './markdown.pipe';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { RouterModule } from '@angular/router';
import { ArticleCommentComponent } from './article-comment/article-comment.component';

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
  declarations: [ArticleComponent, MarkdownPipe, ArticleCommentComponent],
  imports: [CommonModule, SharedModule, articleRouting],
  exports: [ArticleCommentComponent]
})
export class ArticleModule {}
