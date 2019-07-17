import {Article} from './article';
import {User} from './user';

export class Comment {

  commentId: number;
  commentArticleId: number;
  commentUserId: number;
  commentUserNickName: string;
  commentContent: string;

}
