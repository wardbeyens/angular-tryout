import { Profile } from '../shared/models/profile.model';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProfileService } from './../shared/services/profile.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

@Injectable()
export class ProfileResolverService implements Resolve<Profile> {
  constructor(private ProfileService: ProfileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('~~~');
    console.log(route);
    console.log(state);
    console.log('~~~');
    return this.ProfileService.get(route.params['username']).pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
