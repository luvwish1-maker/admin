import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification-edit',
  imports: [CommonModule, ReactiveFormsModule, NgbDatepickerModule, NgbTimepickerModule],
  templateUrl: './notification-edit.component.html',
  styleUrl: './notification-edit.component.css'
})
export class NotificationEditComponent {
  notificationForm: FormGroup;

  messageTypes = ['Info', 'Alert', 'Reminder'];
  messageMethods = ['Email', 'SMS', 'Push'];
  audiences = ['All Users', 'Premium Users', 'Free Users'];

  constructor(private fb: FormBuilder) {
    this.notificationForm = this.fb.group({
      type: ['', Validators.required],
      method: ['', Validators.required],
      audience: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: [''],
      message: ['', Validators.required],
      scheduleDate: [null, Validators.required],
      scheduleTime: [{ hour: 10, minute: 0 }, Validators.required],
      recurring: [false]
    });
  }

  onSave() {
    if (this.notificationForm.invalid) {
      this.notificationForm.markAllAsTouched();
      return;
    }
    console.log('Form Submitted:', this.notificationForm.value);
  }

  isInvalid(controlName: string): boolean {
    const control = this.notificationForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onCancel() {
    this.formInit()
  }

  formInit() {
    this.notificationForm = this.fb.group({
      type: ['', Validators.required],
      method: ['', Validators.required],
      audience: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: [''],
      message: ['', Validators.required],
      scheduleDate: [null, Validators.required],
      scheduleTime: [{ hour: 10, minute: 0 }, Validators.required],
      recurring: [false]
    });
  }
}
