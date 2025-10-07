import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BaseUrl = `${environment.apiUrl}/auth`

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(){
    return this.http.get(`${this.BaseUrl}`)
  }

  getRoles(){
    return this.http.get(`${this.BaseUrl}/roles`)
  }

  getProfile(){
    return this.http.get(`${this.BaseUrl}/profile`)
  }
}
