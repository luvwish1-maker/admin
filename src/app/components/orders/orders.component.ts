import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders = [
    {
      id: 1,
      product: 'Period kit + Pain relief patch Combo',
      orderID: 'order1',
      date: '01/02/2025',
      customerName: 'John Doe',
      location: 'Ernakulam, Kerala',
      status: 'Delivered',
      amount: '500'
    },
    {
      id: 2,
      product: 'Period kit + Pain relief patch Combo',
      orderID: 'order1',
      date: '01/02/2025',
      customerName: 'John Doe',
      location: 'Ernakulam, Kerala',
      status: 'Delivered',
      amount: '500'
    },
    {
      id: 3,
      product: 'Period kit + Pain relief patch Combo',
      orderID: 'order1',
      date: '01/02/2025',
      customerName: 'John Doe',
      location: 'Ernakulam, Kerala',
      status: 'Delivered',
      amount: '500'
    },
    {
      id: 4,
      product: 'Period kit + Pain relief patch Combo',
      orderID: 'order1',
      date: '01/02/2025',
      customerName: 'John Doe',
      location: 'Ernakulam, Kerala',
      status: 'Delivered',
      amount: '500'
    },
    {
      id: 5,
      product: 'Period kit + Pain relief patch Combo',
      orderID: 'order1',
      date: '01/02/2025',
      customerName: 'John Doe',
      location: 'Ernakulam, Kerala',
      status: 'Delivered',
      amount: '500'
    },
    {
      id: 6,
      product: 'Period kit + Pain relief patch Combo',
      orderID: 'order1',
      date: '01/02/2025',
      customerName: 'John Doe',
      location: 'Ernakulam, Kerala',
      status: 'Delivered',
      amount: '500'
    },
    {
      id: 7,
      product: 'Period kit + Pain relief patch Combo',
      orderID: 'order1',
      date: '01/02/2025',
      customerName: 'John Doe',
      location: 'Ernakulam, Kerala',
      status: 'Delivered',
      amount: '500'
    },
    {
      id: 8,
      product: 'Period kit + Pain relief patch Combo',
      orderID: 'order1',
      date: '01/02/2025',
      customerName: 'John Doe',
      location: 'Ernakulam, Kerala',
      status: 'Delivered',
      amount: '500'
    },
  ]
}
