import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    {
      id: 1,
      image: '/product.png',
      name: 'Period kit + Patch Relief Combo',
      price: '800.40',
      summary: 'Each kit includes five sanitary pads, a 25ml sanitizer, and five toilet sheets for hygiene on the go.',
      sales: '1269',
      remaining: '1269'
    },
    {
      id: 2,
      image: '/product.png',
      name: 'Period kit + Patch Relief Combo',
      price: '800.40',
      summary: 'Each kit includes five sanitary pads, a 25ml sanitizer, and five toilet sheets for hygiene on the go.',
      sales: '1269',
      remaining: '1269'
    },
    {
      id: 3,
      image: '/product.png',
      name: 'Period kit + Patch Relief Combo',
      price: '800.40',
      summary: 'Each kit includes five sanitary pads, a 25ml sanitizer, and five toilet sheets for hygiene on the go.',
      sales: '1269',
      remaining: '1269'
    },
    {
      id: 4,
      image: '/product.png',
      name: 'Period kit + Patch Relief Combo',
      price: '800.40',
      summary: 'Each kit includes five sanitary pads, a 25ml sanitizer, and five toilet sheets for hygiene on the go.',
      sales: '1269',
      remaining: '1269'
    },
    {
      id: 5,
      image: '/product.png',
      name: 'Period kit + Patch Relief Combo',
      price: '800.40',
      summary: 'Each kit includes five sanitary pads, a 25ml sanitizer, and five toilet sheets for hygiene on the go.',
      sales: '1269',
      remaining: '1269'
    },
    {
      id: 6,
      image: '/product.png',
      name: 'Period kit + Patch Relief Combo',
      price: '800.40',
      summary: 'Each kit includes five sanitary pads, a 25ml sanitizer, and five toilet sheets for hygiene on the go.',
      sales: '1269',
      remaining: '1269'
    },
    {
      id: 7,
      image: '/product.png',
      name: 'Period kit + Patch Relief Combo',
      price: '800.40',
      summary: 'Each kit includes five sanitary pads, a 25ml sanitizer, and five toilet sheets for hygiene on the go.',
      sales: '1269',
      remaining: '1269'
    },
    {
      id: 8,
      image: '/product.png',
      name: 'Period kit + Patch Relief Combo',
      price: '800.40',
      summary: 'Each kit includes five sanitary pads, a 25ml sanitizer, and five toilet sheets for hygiene on the go.',
      sales: '1269',
      remaining: '1269'
    },
    {
      id: 9,
      image: '/product.png',
      name: 'Period kit + Patch Relief Combo',
      price: '800.40',
      summary: 'Each kit includes five sanitary pads, a 25ml sanitizer, and five toilet sheets for hygiene on the go.',
      sales: '1269',
      remaining: '1269'
    },
  ]
}
