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

  getAllCoupons(){
    return this.http.get(`${this.BaseUrl}`)
  }

  createCoupon(itm:any){
    return this.http.post(`${this.BaseUrl}`,itm)
  }
}
