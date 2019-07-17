import {User} from './user';
import {Topic} from './topic';

export class Article {

  articleId: number;
  articleTopic: Topic;
  articleCreator: User;
  articleRights: string;
  articleTitle: string;
  articleComment: string;
  articleContent: string;

}
