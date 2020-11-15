import { AuthComponent } from './auth.component';
import { SharedModule } from './../shared/shared.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const authRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: AuthComponent,
  },
]);

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, SharedModule, authRouting],
  exports: [AuthComponent]
})
export class AuthModule {}
