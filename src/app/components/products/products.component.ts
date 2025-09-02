import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  allProducts!: any[];
  loading: boolean = true;

  constructor(
    private service: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts = (res.data.data || []).map((product: any) => ({
          ...product,
          mainImage: product.images?.find((img: any) => img.isMain)?.url || 'assets/images/no-image.png'
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    })
  }
}
