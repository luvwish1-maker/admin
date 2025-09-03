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

  getAllProducts() {
    return this.http.get(`${this.BaseUrl}`)
  }

  getProductByID(id: string) {
    return this.http.get(`${this.BaseUrl}/${id}`)
  }

  createNewProduct(itm: any) {
    return this.http.post(`${this.BaseUrl}`, itm)
  }

  updateProduct(id: string, itm: any) {
    return this.http.patch(`${this.BaseUrl}/${id}`, itm)
  }

  deleteProduct(id:any){
    return this.http.delete(`${this.BaseUrl}/${id}`)
  }
}
