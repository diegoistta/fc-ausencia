import { Usuario } from './../app-model/usuario';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfig } from '../app.config';



@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private config: AppConfig
  ) {}

  login(user: Usuario) {
    return this.http.post<any>(this.config.apiUrl + '/logon', { email: user.email, senha: user.senha }).pipe(
        map((res: any) => {
           if (res && res.accessToken) {
             localStorage.setItem('currentUser', JSON.stringify({ usuario: res.data, token: res.accessToken }));
             this.loggedIn.next(true);
        }
          }));
      }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
