import { SharedModule } from './../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileResolverService } from './profile-resolver.service';
import { RouterModule } from '@angular/router';

const profileRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'profile/:username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolverService,
    },
  },
]);

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, SharedModule, profileRouting],
  providers: [ProfileResolverService],
})
export class ProfileModule {}
