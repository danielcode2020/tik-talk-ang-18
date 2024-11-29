import { Injectable } from '@angular/core';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from "../interfaces/profile.interface";
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpClient =  inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  constructor() { }

  getTestAccounts(){
    return this.httpClient.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }
}
