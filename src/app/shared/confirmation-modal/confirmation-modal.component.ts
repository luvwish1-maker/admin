import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure you want to continue?';
  @Input() confirmText = 'Yes';
  @Input() cancelText = 'No';
  @Input() type: 'danger' | 'info' | 'warning' | 'success' = 'info';

  constructor(public activeModal: NgbActiveModal) { }

  confirm() {
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.dismiss(false);
  }

  get icon(): string {
    switch (this.type) {
      case 'danger': return 'bi bi-exclamation-triangle-fill';
      case 'warning': return 'bi bi-exclamation-circle-fill';
      case 'success': return 'bi bi-check-circle-fill';
      default: return 'bi bi-info-circle-fill';
    }
  }

  get headerClass(): string {
    return {
      danger: 'bg-danger text-white',
      warning: 'bg-warning text-dark',
      success: 'bg-success text-white',
      info: 'bg-primary text-white'
    }[this.type];
  }
}
