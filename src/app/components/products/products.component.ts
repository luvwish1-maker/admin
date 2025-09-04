import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { AlertService } from '../../shared/alert/service/alert.service';
import { ConfirmationService } from '../../shared/confirmation-modal/service/confirmation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  allProducts!: any[];
  loading: boolean = true;

  search = '';
  minPrice = '';

  page = 1;
  limit = 6;
  totalPages = 1;
  totalPagesArray: number[] = [];
  total = 0;

  constructor(
    private service: ProductsService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.loading = true;
    const params = {
      search: this.search || '',
      minPrice: this.minPrice || '',
      limit: this.limit,
      page: this.page
    };

    this.service.getAllProducts(params).subscribe({
      next: (res: any) => {
        this.allProducts = (res.data.data || []).map((product: any) => ({
          ...product,
          mainImage: product.images?.find((img: any) => img.isMain)?.url || 'assets/images/no-image.png'
        }));
        this.total = res.data.meta?.total || 0;
        this.totalPages = res.data.meta?.totalPages || 1;
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    })
  }

  applyFilters() {
    this.page = 1;
    this.loadProducts();
  }

  resetFilters() {
  this.search = '';
  this.minPrice = '';
  this.page = 1;
  this.loadProducts();
}

  changePage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.loadProducts();
  }

  deleteItem(id: string) {
    this.confirmationService
      .confirm('Delete Item', 'Are you sure you want to delete this product?', 'Delete', 'Cancel', 'danger')
      .then((confirmed) => {
        if (confirmed) {
          this.loading = true;
          this.service.deleteProduct(id).subscribe({
            next: () => {
              this.allProducts = this.allProducts.filter(c => c.id !== id);
              this.loading = false;
              this.alertService.showAlert({
                message: 'Product Deleted',
                type: 'success',
                autoDismiss: true,
                duration: 4000
              });
            },
            error: (err) => {
              this.alertService.showAlert({
                message: err.error.message,
                type: 'error',
                autoDismiss: true,
                duration: 4000
              });
              this.loading = false;
            }
          });
        }
      });
  }

  goToDetails(id: string) {
    this.router.navigate(['/products', id]);
  }
}
