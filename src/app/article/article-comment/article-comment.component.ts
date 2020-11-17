import { Comment } from './../../shared/models/comment.model';
import { User } from './../../shared/models/user.model';
import { UserService } from './../../shared/services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
})
export class ArticleCommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean;

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.UserService.currentUser.subscribe((userData: User) => {
      this.canModify = userData.username === this.comment.author.username;
    });
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }
  
}
