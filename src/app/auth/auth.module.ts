import { AuthComponent } from './auth.component';
import { SharedModule } from './../shared/shared.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoAuthGuard } from './no-auth.guard';

const authRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'register',
    component: AuthComponent,
  },
]);

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, SharedModule, authRouting],
  exports: [AuthComponent],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
