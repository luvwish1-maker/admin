import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { AlertService } from '../../shared/alert/service/alert.service';
import { ConfirmationService } from '../../shared/confirmation-modal/service/confirmation.service';

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
