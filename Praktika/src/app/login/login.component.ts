import { Component, OnInit } from '@angular/core';
import {LoginResponse} from './login-response';
import {LoginReqest} from './login-reqest';
import {UserService} from '../user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private cookieService: CookieService,
              private router: Router) {}
  login = '';
  password = '';
  loginRequest: LoginReqest;
  ngOnInit(): void {
  }
  submit(): void {
    this.loginRequest = new LoginReqest(this.login, this.password);
    this.userService.login(this.loginRequest).subscribe((value: LoginResponse) => {
      console.log(value);
      this.cookieService.set('token', 'Bearer ' + value.token);
      this.cookieService.set('username', this.login);
      alert('Вы успешно вошли в систему');
      this.router.navigateByUrl('/');
    },
      error => {
      console.log(error);
      alert('Неверный логин или пароль');
      });
  }

}
