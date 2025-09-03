import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private modalService: NgbModal) { }

  confirm(
    title: string,
    message: string,
    confirmText: string = 'Yes',
    cancelText: string = 'No',
    type: 'danger' | 'info' | 'warning' | 'success' = 'info'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { centered: true });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.confirmText = confirmText;
    modalRef.componentInstance.cancelText = cancelText;
    modalRef.componentInstance.type = type;

    return modalRef.result.then(
      (result) => result === true,
      () => false
    );
  }

}
