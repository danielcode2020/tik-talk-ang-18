import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from './auth.interface';
import {catchError, of, tap, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {setThrowInvalidWriteToSignalError} from '@angular/core/primitives/signals';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  cookieService = inject(CookieService);
  http = inject(HttpClient);
  router = inject(Router);

  token : string | null = null;
  refreshToken : string | null = null;

  get isAuth(){
    if (!this.token){
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload:{username : string, password : string}){

    const fd = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`,
      fd
    ).pipe(
      tap(value => this.saveTokens(value))
    );
  }

  refreshAuthToken(){
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}refresh`,
      {
        refresh_token: this.refreshToken
      }
    ).pipe(
      tap(value => this.saveTokens(value)),
      catchError(err =>{
        this.logout();
        return throwError(err);
      })
    )
  }

  logout(){
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(res : TokenResponse){
      this.token = res.access_token;
      this.refreshToken = res.refresh_token;

      this.cookieService.set('token', this.token);
      this.cookieService.set('refreshToken', this.refreshToken);
  }
}