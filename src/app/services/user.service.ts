import {Injectable, Input} from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userInit: User = {
    userId: 0,
    userLastName: '', userFirstName: '', userMiddleName: '',
    userMail: '', userPhone: '',
    userLogin: '', userPassword: '', userNickName: '',
    userAdmin: false, userStatusOfActivity: false
  };

  private user = new BehaviorSubject<User>(this.userInit);
  castUser = this.user.asObservable();

  private urlBase: string = 'http://localhost:8080';
  private urlEnter: string = '/user/enter';
  private urlRegister: string = '/user';
  private urlDeleting: string = '/delete';

  public enterLoginPassword(dataLoginPassword: string[]): Observable<User> {
    return this.http.post<User>((this.urlBase + this.urlEnter), dataLoginPassword);
  }

  public registerAndEnter(newUser: User): Observable<User> {
    return this.http.post<User>((this.urlBase + this.urlRegister), newUser);
  }

  public getAllUsers(userId: number): Observable<User[]> {
    let params = new HttpParams().set("userId", (userId + ""));
    return this.http.get<User[]>((this.urlBase + this.urlRegister), {params});
  }

  public deleteAccountByIdForAdmin(accountId: number, userId: number): Observable<boolean> {
    return this.http.delete<boolean>((this.urlBase + this.urlRegister) + ('/' + accountId) + this.urlDeleting,
      {params: {userId: userId + ''}});
  }

  constructor(private http: HttpClient) { }

  public editUser(newUser: User): void {
    this.user.next(newUser);
  }

  public clearUser(): void {
  let userZero: User = {
      userId: 0,
      userLastName: '', userFirstName: '', userMiddleName: '',
      userMail: '', userPhone: '',
      userLogin: '', userPassword: '', userNickName: '',
      userAdmin: false, userStatusOfActivity: false
    };
    this.editUser(userZero);
  }

}
