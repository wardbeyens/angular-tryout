import { FollowButtonComponent } from './buttons/follow-button/follow-button.component';
import { ShowAuthedDirective } from './directive/show-authed.directive';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ArticleMetaComponent } from './article-helper/article-meta/article-meta.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';

@NgModule({
  declarations: [ShowAuthedDirective, FollowButtonComponent, ArticleMetaComponent, FavoriteButtonComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, ComponentsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    ShowAuthedDirective,
    FollowButtonComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
})
export class SharedModule {}
