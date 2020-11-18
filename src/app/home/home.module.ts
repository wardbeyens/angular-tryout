import { HomeAuthResolverService } from './home-auth-resolver.service';
import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const homeRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    resolve: {
      isAuthenticated: HomeAuthResolverService
    }
  },
]);

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, homeRouting, SharedModule],
  exports: [HomeComponent],
})
export class HomeModule {}
