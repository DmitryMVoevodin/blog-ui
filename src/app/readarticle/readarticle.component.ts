import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {Article} from '../models/article';
import {ArticleService} from '../services/article.service';
import {CommentService} from '../services/comment.service';

@Component({
  selector: 'app-readarticle',
  templateUrl: './readarticle.component.html',
  styleUrls: ['./readarticle.component.css']
})
export class ReadArticleComponent implements OnInit {

  private user: User;
  private article: Article;

  private articleSelectedId: number;
  private topicSelectedId: number;

  private isCommentingAvailable: boolean = false;



  constructor(private userService: UserService, private articleService: ArticleService, private commentService: CommentService, private router: Router) { }

  ngOnInit() {
    this.userService.castUser.subscribe(user => this.user = user);
    this.articleService.castArticleSelected.subscribe(articleSelectedId => this.articleSelectedId = articleSelectedId);
    this.articleService.castTopicSelected.subscribe(topicSelectedId => this.topicSelectedId = topicSelectedId);

    this.articleService.getArticleById(this.topicSelectedId, this.articleSelectedId, this.user.userId).subscribe(
      result => {
        if (result != null) {
          this.article = result;

          /******************* Комментирование разрешено? *******************/
          this.commentService.isCommentingAvailableForArticle(this.topicSelectedId, this.articleSelectedId, this.user.userId).subscribe(
            resultCommentingAvailability => {
              this.isCommentingAvailable = resultCommentingAvailability;
            },
            error => {
              alert('An unexpected error occurred while getting the information about availability to comment');
              this.isCommentingAvailable = false;
            }
          );
          /******************************************************************/

        }
      },
      error => {alert('An unexpected error occurred while getting the article');}
    );

  }

  public exitFromBlog(): void {
    this.userService.clearUser();
    this.router.navigate(['auth/sign_in']);
  }

  public returnToTopics(): void {
    this.router.navigate(['topics']);
  }

}
