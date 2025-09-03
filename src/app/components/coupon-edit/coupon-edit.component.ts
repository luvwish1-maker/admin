import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from '../services/coupons/coupon.service';
import { AlertService } from '../../shared/alert/service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coupon-edit',
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule, NgbTimepickerModule],
  templateUrl: './coupon-edit.component.html',
  styleUrl: './coupon-edit.component.css'
})
export class CouponEditComponent implements OnInit {
  couponForm!: FormGroup;
  couponId: string | null = null;
  loading = false;
  loadingData = false; 

  constructor(
    private fb: FormBuilder,
    private service: CouponService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formInit();
  }

  ngOnInit(): void {
    this.couponId = this.route.snapshot.paramMap.get('id');
    if (this.couponId) {
      this.loadingData = true;
      this.couponInit(this.couponId)
    }
  }

  couponInit(id: string) {
    if (id) {
      this.service.getCouponByID(id).subscribe({
        next: (res: any) => {
          const data = res.data;

          this.couponForm.patchValue({
            couponName: data.couponName,
            ValueType: data.ValueType,
            Value: data.Value,
            minimumSpent: data.minimumSpent,
            usageLimitPerPerson: data.usageLimitPerPerson,
            validFrom: this.convertToDatepickerFormat(data.validFrom),
            ValidTill: this.convertToDatepickerFormat(data.ValidTill)
          });
          this.loadingData = false;
        },
        error: (err) => {
          this.loadingData = false;
          this.alertService.showAlert({
            message: err.error.message,
            type: 'error',
            autoDismiss: true,
            duration: 4000
          });
        }
      });
    }
  }

  private convertToDatepickerFormat(dateString: string | null) {
    if (!dateString) return null;
    const date = new Date(dateString);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  formInit() {
    this.couponForm = this.fb.group({
      couponName: ['', Validators.required],
      ValueType: ['', Validators.required],
      Value: ['', Validators.required],
      minimumSpent: [''],
      usageLimitPerPerson: ['', Validators.required],
      validFrom: [null, Validators.required],
      ValidTill: [null, Validators.required]
    });
  }

  onSave() {
    if (this.couponForm.invalid) {
      this.couponForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formValue = this.couponForm.value;

    const payload = {
      ...formValue,
      Value: String(formValue.Value),
      validFrom: formValue.validFrom ? new Date(
        formValue.validFrom.year,
        formValue.validFrom.month - 1,
        formValue.validFrom.day
      ) : null,
      ValidTill: formValue.ValidTill ? new Date(
        formValue.ValidTill.year,
        formValue.ValidTill.month - 1,
        formValue.ValidTill.day
      ) : null
    };

    if (this.couponId) {
      this.service.updateCoupon(this.couponId, payload).subscribe({
        next: () => {
          this.loading = false;
          this.alertService.showAlert({
            message: 'Coupon Updated',
            type: 'success',
            autoDismiss: true,
            duration: 4000
          });
          this.router.navigate(['/coupons']);
        },
        error: (err) => {
          this.loading = false;
          this.alertService.showAlert({
            message: err.error.message,
            type: 'error',
            autoDismiss: true,
            duration: 4000
          });
        }
      });
    } else {
      this.service.createCoupon(payload).subscribe({
        next: () => {
          this.loading = false;
          this.alertService.showAlert({
            message: 'Coupon Created',
            type: 'success',
            autoDismiss: true,
            duration: 4000
          });
          this.router.navigate(['/coupons']);
        },
        error: (err) => {
          this.loading = false;
          this.alertService.showAlert({
            message: err.error.message,
            type: 'error',
            autoDismiss: true,
            duration: 4000
          });
        }
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.couponForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onCancel() {
    this.formInit();
  }
}
