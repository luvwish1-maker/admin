import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from '../services/coupons/coupon.service';

@Component({
  selector: 'app-coupon-edit',
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule, NgbTimepickerModule],
  templateUrl: './coupon-edit.component.html',
  styleUrl: './coupon-edit.component.css'
})
export class CouponEditComponent {
  couponForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CouponService
  ) {
    this.formInit();
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

    const formValue = this.couponForm.value;

    const payload = {
      ...formValue,
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

    this.service.createCoupon(payload).subscribe({
      next: (res) => {
        console.log('Coupon Created Successfully:', res);
        this.formInit();
      },
      error: (err) => {
        console.error('Error creating coupon:', err);
      }
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.couponForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onCancel() {
    this.formInit();
  }
}
