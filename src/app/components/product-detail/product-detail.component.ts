import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { AlertService } from '../../shared/alert/service/alert.service';
import { ConfirmationService } from '../../shared/confirmation-modal/service/confirmation.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private router: Router,
    private alertService: AlertService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProduct(productId);
    }
  }

  fetchProduct(id: string) {
    this.loading = true;
    this.service.getProductByID(id).subscribe({
      next: (res: any) => {
        this.product = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onEdit() {
    if (this.product?.id) {
      this.router.navigate(['/products/edit', this.product.id]);
    }
  }

  onDelete(id: string) {
    this.confirmationService
      .confirm('Delete Item', 'Are you sure you want to delete this product?', 'Delete', 'Cancel', 'danger')
      .then((confirmed) => {
        if (confirmed) {
          this.loading = true;
          this.service.deleteProduct(id).subscribe({
            next: () => {
              this.loading = false;
              this.alertService.showAlert({
                message: 'Product Deleted',
                type: 'success',
                autoDismiss: true,
                duration: 4000
              });
              this.router.navigate(['/products'])
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
}
