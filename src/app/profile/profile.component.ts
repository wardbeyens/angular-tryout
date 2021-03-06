import { UserService } from './../shared/services/user.service';
import { Profile } from '../shared/models/profile.model';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  currentUser: User;
  isUser: Boolean;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
    });

    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      this.isUser = this.currentUser.username === this.profile.username;
    });
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
}
