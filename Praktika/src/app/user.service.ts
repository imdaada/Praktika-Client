import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginReqest} from './login/login-reqest';
import {Observable} from 'rxjs';
import {RegisterRequest} from './register/register-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  url = 'http://localhost:8080/';
  public login(loginReqest: LoginReqest): Observable<any>{
    return this.httpClient.post(this.url + 'authenticate', loginReqest);
  }
  public role(): Observable<any>{
    return this.httpClient.get(this.url + 'role');
  }
  public register(registerRequest: RegisterRequest): Observable<any>{
    return this.httpClient.post(this.url + 'register', registerRequest);
  }

}
