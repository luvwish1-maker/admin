import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CouponService } from '../services/coupons/coupon.service';
import { ConfirmationService } from '../../shared/confirmation-modal/service/confirmation.service';
import { AlertService } from '../../shared/alert/service/alert.service';

@Component({
  selector: 'app-coupons',
  imports: [CommonModule, RouterModule],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.css'
})
export class CouponsComponent implements OnInit {

  loading: boolean = true;
  allCouponns!: any[];

  constructor(
    private service: CouponService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService
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

  deleteItem(id: string) {
    this.confirmationService
      .confirm('Delete Item', 'Are you sure you want to delete this coupon?', 'Delete', 'Cancel', 'danger')
      .then((confirmed) => {
        if (confirmed) {
          this.loading = true;
          this.service.deleteCoupon(id).subscribe({
            next: () => {
              this.allCouponns = this.allCouponns.filter(c => c.id !== id);
              this.loading = false;
              this.alertService.showAlert({
                message: 'Coupon Deleted',
                type: 'success',
                autoDismiss: true,
                duration: 4000
              });
            },
            error: (err) => {
              this.alertService.showAlert({
                message: err.error.message,
                type: 'error',
                autoDismiss: true,
                duration: 4000
              });
              this.loading = false;
            }
          });
        }
      });
  }

}
