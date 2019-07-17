import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {ArticleService} from '../services/article.service';
import {TopicService} from '../services/topic.service';
import {Topic} from '../models/topic';
import {Article} from '../models/article';

@Component({
  selector: 'app-addingarticle',
  templateUrl: './addingarticle.component.html',
  styleUrls: ['./addingarticle.component.css']
})
export class AddingArticleComponent implements OnInit {

  private user: User;
  private topicSelected: Topic;

  private newArticle: Article = new Article();

  private keyStringForRights: string = '---------';
  private keyStringForRightsRead: string = '---';
  private keyStringForRightsWrite: string = '---';
  private keyStringForRightsComment: string = '---';

  private allUsers: User[];

  private readRightsValueSelected: string[];
  private readRightsValueSelectedUsers: string[];
  private readRightsValueSelectedSum: number = 0;
  private writeRightsValueSelected: string[];
  private writeRightsValueSelectedUsers: string[];
  private writeRightsValueSelectedSum: number = 0;
  private commentRightsValueSelected: string[];
  private commentRightsValueSelectedUsers: string[];
  private commentRightsValueSelectedSum: number = 0;

  constructor(private userService: UserService, private topicService: TopicService, private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.userService.castUser.subscribe(user => this.user = user);
    this.topicService.castTopicSelected.subscribe(topicSelected => this.topicSelected = topicSelected);

    this.userService.getAllUsers(this.user.userId).subscribe(
      result => { if (result != null) { this.allUsers = result; } },
      error => { alert('An unexpected error occurred while getting a list of users'); } );

    this.newArticle.articleId = 0;
    this.newArticle.articleTitle = '';
    this.newArticle.articleComment = '';
    this.newArticle.articleContent = '';

  }

  public sumOfElements(typeOfRights: string): void {
    if (typeOfRights == 'r') {
      this.readRightsValueSelectedSum = 0;
      for (var index = 0; index < this.readRightsValueSelected.length; index++) {
        this.readRightsValueSelectedSum += parseInt(this.readRightsValueSelected[index], 10);
      }
      this.keyStringForRightsRead = this.formPartOfKey(this.readRightsValueSelectedSum, typeOfRights);
    }
    if (typeOfRights == 'w') {
      this.writeRightsValueSelectedSum = 0;
      for (var index = 0; index < this.writeRightsValueSelected.length; index++) {
        this.writeRightsValueSelectedSum += parseInt(this.writeRightsValueSelected[index], 10);
      }
      this.keyStringForRightsWrite = this.formPartOfKey(this.writeRightsValueSelectedSum, typeOfRights);
    }
    if (typeOfRights == 'c') {
      this.commentRightsValueSelectedSum = 0;
      for (var index = 0; index < this.commentRightsValueSelected.length; index++) {
        this.commentRightsValueSelectedSum += parseInt(this.commentRightsValueSelected[index], 10);
      }
      this.keyStringForRightsComment = this.formPartOfKey(this.commentRightsValueSelectedSum, typeOfRights);
    }
    this.keyStringForRights =
      this.keyStringForRightsRead[0] + this.keyStringForRightsWrite[0] + this.keyStringForRightsComment[0] +
      this.keyStringForRightsRead[1] + this.keyStringForRightsWrite[1] + this.keyStringForRightsComment[1] +
      this.keyStringForRightsRead[2] + this.keyStringForRightsWrite[2] + this.keyStringForRightsComment[2];
  }

  private formPartOfKey(sum: number, typeOfRights: string): string {
    var result: string;
    switch (sum) {
      case 0: result = '---'; break;
      case 1: result = typeOfRights + '--'; break;
      case 2: result = '-' + typeOfRights + '-'; break;
      case 3: result = typeOfRights + typeOfRights + '-'; break;
      case 4: result = '--' + typeOfRights; break;
      case 5: result = typeOfRights + '-' + typeOfRights; break;
      case 6: result = '-' + typeOfRights + typeOfRights; break;
      case 7: result = typeOfRights + typeOfRights + typeOfRights; break;
      default: result = '---'; break;
    }
    return result;
  }

  public addArticle(): void {
    this.newArticle.articleRights = this.keyStringForRights;
    this.newArticle.articleId = 0;
    this.newArticle.articleTopic = this.topicSelected;
    this.newArticle.articleCreator = this.user;
    this.articleService.addArticle(this.newArticle.articleTopic.topicId, this.newArticle).subscribe(
      result => {
        if (result > 0) {

          this.newArticle.articleId = result;
          var nicknameAndRights: string[] = ['', ''];

          var readLetter: string;
          var writeLetter: string;
          var commentLetter: string;

          var readUsersArrayOfStrings: string[] = [''];
          var kRead = 0;
          if(this.readRightsValueSelectedUsers != null && this.allUsers != null) {
            for(var iUserRead = 0; iUserRead < this.readRightsValueSelectedUsers.length; iUserRead++) {
              for(var iAllUser = 0; iAllUser < this.allUsers.length; iAllUser++) {
                if(this.allUsers[iAllUser].userId == parseInt(this.readRightsValueSelectedUsers[iUserRead], 10)) {
                  readUsersArrayOfStrings[kRead] = this.allUsers[iAllUser].userNickName;
                  kRead++;
                  break;
                }
              }
            }
          }
          var writeUsersArrayOfStrings: string[] = [''];
          var kWrite = 0;
          if(this.writeRightsValueSelectedUsers != null && this.allUsers != null) {
            for(var iUserWrite = 0; iUserWrite < this.writeRightsValueSelectedUsers.length; iUserWrite++) {
              for(var iAllUser = 0; iAllUser < this.allUsers.length; iAllUser++) {
                if(this.allUsers[iAllUser].userId == parseInt(this.writeRightsValueSelectedUsers[iUserWrite], 10)) {
                  writeUsersArrayOfStrings[kWrite] = this.allUsers[iAllUser].userNickName;
                  kWrite++;
                  break;
                }
              }
            }
          }
          var commentUsersArrayOfStrings: string[] = [''];
          var kComment = 0;
          if(this.commentRightsValueSelectedUsers != null && this.allUsers != null) {
            for(var iUserComment = 0; iUserComment < this.commentRightsValueSelectedUsers.length; iUserComment++) {
              for(var iAllUser = 0; iAllUser < this.allUsers.length; iAllUser++) {
                if(this.allUsers[iAllUser].userId == parseInt(this.commentRightsValueSelectedUsers[iUserComment], 10)) {
                  commentUsersArrayOfStrings[kComment] = this.allUsers[iAllUser].userNickName;
                  kComment++;
                  break;
                }
              }
            }
          }

          for(var iUser = 0; iUser < this.allUsers.length; iUser++) {

            nicknameAndRights[0] = this.allUsers[iUser].userNickName;
            nicknameAndRights[1] = '---';
            readLetter = '-';
            writeLetter = '-';
            commentLetter = '-';
            var isNeededToBeAddedToDataBase: boolean = false;

            for(var iUserRead = 0; iUserRead < readUsersArrayOfStrings.length; iUserRead++) {
              if(nicknameAndRights[0] == readUsersArrayOfStrings[iUserRead]) {
                readLetter = 'r';
                isNeededToBeAddedToDataBase = true;
                break;
              }
            }
            for(var iUserWrite = 0; iUserWrite < writeUsersArrayOfStrings.length; iUserWrite++) {
              if(nicknameAndRights[0] == writeUsersArrayOfStrings[iUserWrite]) {
                writeLetter = 'w';
                isNeededToBeAddedToDataBase = true;
                break;
              }
            }
            for(var iUserComment = 0; iUserComment < commentUsersArrayOfStrings.length; iUserComment++) {
              if(nicknameAndRights[0] == commentUsersArrayOfStrings[iUserComment]) {
                commentLetter = 'c';
                isNeededToBeAddedToDataBase = true;
                break;
              }
            }


            if (isNeededToBeAddedToDataBase) {
              nicknameAndRights[1] = readLetter + writeLetter + commentLetter;
              this.articleService.addSettingsForOnePersonInGroup(
                this.newArticle.articleTopic.topicId, this.newArticle.articleId, nicknameAndRights).subscribe(
                resultForOnePersonInGroup => {
                  //
                },
                errorForOnePersonInGroup => {alert('An unexpected error occurred while adding settings');}
              );
            }

          }

          this.returnToTopics();

        }
      },
      error => {alert('An unexpected error occurred while getting articles');}
    );
  }


  public exitFromBlog(): void {
    this.topicService.clearTopicSelected();
    this.userService.clearUser();
    this.router.navigate(['auth/sign_in']);
  }

  public returnToTopics(): void {
    this.topicService.clearTopicSelected();
    this.router.navigate(['topics']);
  }

}
