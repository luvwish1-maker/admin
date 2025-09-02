import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-coupon-edit',
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule, NgbTimepickerModule],
  templateUrl: './coupon-edit.component.html',
  styleUrl: './coupon-edit.component.css'
})
export class CouponEditComponent {
  couponForm!: FormGroup;

  constructor(private fb: FormBuilder) {
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
    console.log('Coupon Submitted:', this.couponForm.value);
  }

  isInvalid(controlName: string): boolean {
    const control = this.couponForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onCancel() {
    this.formInit();
  }
}
