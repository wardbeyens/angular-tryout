import { ListErrorsComponent } from './list-errors/list-errors.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ListErrorsComponent],
  imports: [
    CommonModule
  ], 
  exports: [ListErrorsComponent]
})
export class ComponentsModule { }
