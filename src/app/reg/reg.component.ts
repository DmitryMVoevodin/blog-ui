import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {UserValidation} from '../models/userv';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  private userV: UserValidation = {
    userLastNameValidation: ' ',
    userFirstNameValidation: ' ',
    userMiddleNameValidation: ' ',
    userMailValidation: ' ',
    userPhoneValidation: ' ',
    userLoginValidation: ' ',
    userPasswordValidation: ' ',
    userNickNameValidation: ' '
  };

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

  public registerAndEnterBlog(): void {
    if (this.checkValidation()) {
      this.userService.registerAndEnter(this.user)
        .subscribe(
          result => {
            if (result != null) {
              this.user = result;
              this.router.navigate(['/topics']);
            } else {
              this.router.navigate(['auth/autherr']);
            }
          },
          error => {alert('An unexpected error occurred while registering and entering an account');}
        );
    }
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  private checkValidation(): boolean {

    let isValid = true;
    this.userV.userLastNameValidation = ' ';
    this.userV.userFirstNameValidation = ' ';
    this.userV.userMiddleNameValidation = ' ';
    this.userV.userMailValidation = ' ';
    this.userV.userPhoneValidation = ' ';
    this.userV.userLoginValidation = ' ';
    this.userV.userPasswordValidation = ' ';
    this.userV.userNickNameValidation = ' ';

    //Проверка на пустые значения
    if (this.user.userLastName.length == 0) {
      isValid = false;
      this.userV.userLastNameValidation = 'Значение не должно быть пустым!';
    }
    if (this.user.userFirstName.length == 0) {
      isValid = false;
      this.userV.userFirstNameValidation = 'Значение не должно быть пустым!';
    }
    if (this.user.userMiddleName.length == 0) {
      isValid = false;
      this.userV.userMiddleNameValidation = 'Значение не должно быть пустым!';
    }
    if (this.user.userMail.length == 0) {
      isValid = false;
      this.userV.userMailValidation = 'Значение не должно быть пустым!';
    }
    if (this.user.userPhone.length == 0) {
      isValid = false;
      this.userV.userPhoneValidation = 'Значение не должно быть пустым!';
    }
    if (this.user.userLogin.length == 0) {
      isValid = false;
      this.userV.userLoginValidation = 'Значение не должно быть пустым!';
    }
    if (this.user.userPassword.length == 0) {
      isValid = false;
      this.userV.userPasswordValidation = 'Значение не должно быть пустым!';
    }
    if (this.user.userNickName.length == 0) {
      isValid = false;
      this.userV.userNickNameValidation = 'Значение не должно быть пустым!';
    }

    //Проверка строк на длину
    if (this.user.userLastName.length > 20) {
      isValid = false;
      this.userV.userLastNameValidation = 'Поле не должно быть > 20 символов!';
    }
    if (this.user.userFirstName.length > 20) {
      isValid = false;
      this.userV.userFirstNameValidation = 'Поле не должно быть > 20 символов!';
    }
    if (this.user.userMiddleName.length > 20) {
      isValid = false;
      this.userV.userMiddleNameValidation = 'Поле не должно быть > 20 символов!';
    }
    if (this.user.userMail.length > 20) {
      isValid = false;
      this.userV.userMailValidation = 'Поле не должно быть > 20 символов!';
    }
    if (this.user.userPhone.length > 20) {
      isValid = false;
      this.userV.userPhoneValidation = 'Поле не должно быть > 20 символов!';
    }
    if (this.user.userLogin.length > 20) {
      isValid = false;
      this.userV.userLoginValidation = 'Поле не должно быть > 20 символов!';
    }
    if (this.user.userPassword.length > 20) {
      isValid = false;
      this.userV.userPasswordValidation = 'Поле не должно быть > 20 символов!';
    }
    if (this.user.userNickName.length > 20) {
      isValid = false;
      this.userV.userNickNameValidation = 'Поле не должно быть > 20 символов!';
    }

    //Проверка специфики рассматриваемых значений

    return isValid;
  }

}
