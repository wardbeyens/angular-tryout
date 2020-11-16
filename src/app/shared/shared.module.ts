import { FollowButtonComponent } from './buttons/follow-button/follow-button.component';
import { ShowAuthedDirective } from './directive/show-authed.directive';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [ShowAuthedDirective, FollowButtonComponent],
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
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
})
export class SharedModule {}
