import {Component, Input, OnInit} from '@angular/core';
import { Comment } from '../models/comment';
import {CommentService} from '../services/comment.service';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  private user: User;

  @Input() articleId: number;
  @Input() topicId: number;
  @Input() userId: number;
  @Input() isCommentingAvailable: boolean;

  private commentContent: string = '';

  private comments: Comment[];

  constructor(private commentService: CommentService, private userService: UserService) { }

  ngOnInit() {
    this.getAllCommentsForArticle(this.topicId, this.articleId, this.userId);
  }

  private getAllCommentsForArticle(topicId: number, articleId: number, userId: number) {
    this.userService.castUser.subscribe(user => this.user = user);
    this.commentService.getAllCommentsForArticle(topicId, articleId, userId).subscribe(
      result => {
        if (result != null) {
          this.comments = result.reverse();
        } else {
          this.comments = null;
        }
      },
      error => {alert('An unexpected error occurred while getting articles');}
    );
  }

  private addComment(): void {
    this.commentService.addComment(this.topicId, this.articleId, this.userId, this.commentContent).subscribe(
      result => {
        if (result) {
          this.getAllCommentsForArticle(this.topicId, this.articleId, this.userId);
        }
      },
      error => {alert('An expected error occurred while adding a comment to the article');}
    );
    this.commentContent = '';
  }

  private deleteCommentById(commentId: number): void {
    this.commentService.deleteCommentById(this.topicId, this.articleId, this.userId, commentId).subscribe(
      result => {
        if (result) {
          this.getAllCommentsForArticle(this.topicId, this.articleId, this.userId);
        }
      },
      error1 => {alert('An expected error occurred while deleting a comment');}
    );
  }

}
