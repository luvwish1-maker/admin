import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule, RouterModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications = [
    {
      id: 1,
      type: 'Offer Message',
      method: 'Whatsapp',
      schedule: '01/02/2025',
      target: 'All Customers',
      status: 'Delivered',
    },
    {
      id: 2,
      type: 'Offer Message',
      method: 'Whatsapp',
      schedule: '01/02/2025',
      target: 'All Customers',
      status: 'Delivered',
    },
    {
      id: 3,
      type: 'Offer Message',
      method: 'Whatsapp',
      schedule: '01/02/2025',
      target: 'All Customers',
      status: 'Delivered',
    },
    {
      id: 4,
      type: 'Offer Message',
      method: 'Whatsapp',
      schedule: '01/02/2025',
      target: 'All Customers',
      status: 'Delivered',
    },
    {
      id: 5,
      type: 'Offer Message',
      method: 'Whatsapp',
      schedule: '01/02/2025',
      target: 'All Customers',
      status: 'Delivered',
    },
    {
      id: 6,
      type: 'Offer Message',
      method: 'Whatsapp',
      schedule: '01/02/2025',
      target: 'All Customers',
      status: 'Delivered',
    },
    {
      id: 7,
      type: 'Offer Message',
      method: 'Whatsapp',
      schedule: '01/02/2025',
      target: 'All Customers',
      status: 'Delivered',
    },
    {
      id: 8,
      type: 'Offer Message',
      method: 'Whatsapp',
      schedule: '01/02/2025',
      target: 'All Customers',
      status: 'Delivered',
    },
  ]
}
