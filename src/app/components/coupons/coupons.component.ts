import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CouponService } from '../services/coupons/coupon.service';

@Component({
  selector: 'app-coupons',
  imports: [CommonModule, RouterModule],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.css'
})
export class CouponsComponent implements OnInit {
  coupons = [
    {
      id: 1,
      code: 'Welcome50',
      type: 'Percentage',
      value: '50%',
      minSpend: '400',
      startDate: '01/02/2025',
      endDate: '01/02/2025',
      status: 'Active',
    },
    {
      id: 2,
      code: 'Welcome50',
      type: 'Percentage',
      value: '50%',
      minSpend: '400',
      startDate: '01/02/2025',
      endDate: '01/02/2025',
      status: 'Active',
    },
    {
      id: 3,
      code: 'Welcome50',
      type: 'Percentage',
      value: '50%',
      minSpend: '400',
      startDate: '01/02/2025',
      endDate: '01/02/2025',
      status: 'Active',
    },
    {
      id: 4,
      code: 'Welcome50',
      type: 'Percentage',
      value: '50%',
      minSpend: '400',
      startDate: '01/02/2025',
      endDate: '01/02/2025',
      status: 'Active',
    },
    {
      id: 5,
      code: 'Welcome50',
      type: 'Percentage',
      value: '50%',
      minSpend: '400',
      startDate: '01/02/2025',
      endDate: '01/02/2025',
      status: 'Active',
    },
    {
      id: 6,
      code: 'Welcome50',
      type: 'Percentage',
      value: '50%',
      minSpend: '400',
      startDate: '01/02/2025',
      endDate: '01/02/2025',
      status: 'Active',
    },
    {
      id: 7,
      code: 'Welcome50',
      type: 'Percentage',
      value: '50%',
      minSpend: '400',
      startDate: '01/02/2025',
      endDate: '01/02/2025',
      status: 'Active',
    },
    {
      id: 8,
      code: 'Welcome50',
      type: 'Percentage',
      value: '50%',
      minSpend: '400',
      startDate: '01/02/2025',
      endDate: '01/02/2025',
      status: 'Active',
    },
  ]

    loading: boolean = true;
    allCouponns!:any[];

  constructor(
    private service: CouponService
  ) { }

  ngOnInit(): void {
    this.loadCoupons()
  }

  loadCoupons() {
    this.loading = true;
    this.service.getAllCoupons().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allCouponns = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    })
  }
  
}
