import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  public user: User = {
    userId: 0,
    userLastName: '',
    userFirstName: '',
    userMiddleName: '',
    userMail: '',
    userPhone: '',
    userLogin: '',
    userPassword: '',
    userNickName: '',
    userAdmin: false,
    userStatusOfActivity: false
  };


  private dataLoginPassword: string[] = ['', ''];

  public enterBlog(login: string, password: string): void {
    this.dataLoginPassword[0] = login;
    this.dataLoginPassword[1] = password;
    this.userService.enterLoginPassword(this.dataLoginPassword)
      .subscribe(
        result => {
            if (result != null) {
              this.user = result;
              this.router.navigate(['/topics']);
            } else {
              this.router.navigate(['auth/autherr']);
            }
          },
        error => {alert('An unexpected error occurred while entering an account');}
      );

  }

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

}
