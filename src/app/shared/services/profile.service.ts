import { map } from 'rxjs/operators';
import { Profile } from '../models/profile.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private ApiService: ApiService) {}

  get(username: string): Observable<Profile> {
    return this.ApiService.get('/profiles/' + username).pipe(map((data: { profile: Profile }) => data.profile));
  }

  follow(userName: string): Observable<Profile> {
    return this.ApiService.post('/profiles/' + userName + '/follow');
  }

  unfollow(userName: string): Observable<Profile> {
    return this.ApiService.delete('/profiles/' + userName + '/follow');
  }
}
