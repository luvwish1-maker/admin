import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private BaseUrl = `${environment.apiUrl}/coupons`

  constructor(
    private http: HttpClient
  ) { }

  getAllCoupons() {
    return this.http.get(`${this.BaseUrl}`)
  }

  createCoupon(itm: any) {
    return this.http.post(`${this.BaseUrl}`, itm)
  }

  getCouponByID(id: string) {
    return this.http.get(`${this.BaseUrl}/${id}`)
  }

  updateCoupon(id: string, itm: any) {
    return this.http.patch(`${this.BaseUrl}/${id}`, itm);
  }

  deleteCoupon(id:string){
    return this.http.delete(`${this.BaseUrl}/${id}`)
  }
}
