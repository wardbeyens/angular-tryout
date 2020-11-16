import { ShowAuthedDirective } from './directive/show-authed.directive';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [ShowAuthedDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, ComponentsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    ShowAuthedDirective,
  ],
})
export class SharedModule {}
