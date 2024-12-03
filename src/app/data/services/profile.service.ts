import {Injectable, signal} from '@angular/core';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from "../interfaces/profile.interface";
import {Pageable} from '../interfaces/pageable.interface';
import {map, tap} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpClient =  inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  me = signal<Profile | null>(null);
  constructor() { }

  getTestAccounts(){
    return this.httpClient.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getMe() {
    return this.httpClient
      .get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getSubscribersShortList(){
    return this.httpClient.get<Pageable<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res =>res.items.slice(0,3))
      )
  }
}
