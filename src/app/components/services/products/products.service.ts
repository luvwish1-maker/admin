import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private BaseUrl = `${environment.apiUrl}/products`

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(){
    return this.http.get(`${this.BaseUrl}`)
  }
}
