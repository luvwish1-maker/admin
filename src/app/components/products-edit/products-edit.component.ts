import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { AlertService } from '../../shared/alert/service/alert.service';

@Component({
  selector: 'app-products-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products-edit.component.html',
  styleUrl: './products-edit.component.css'
})
export class ProductsEditComponent implements OnInit {
  productForm!: FormGroup;
  loadingData = false;
  loading = false;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.loadProduct(this.productId);
    }
  }

  buildForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      categoryName: ['', Validators.required],
      discountedPrice: [0, [Validators.required, Validators.min(1)]],
      actualPrice: [0, [Validators.required, Validators.min(1)]],
      stockCount: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      isStock: [false, Validators.required],
      images: this.fb.array([])
    });
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  createImageGroup(data?: any): FormGroup {
    return this.fb.group({
      url: [data?.url || '', Validators.required],
      altText: [data?.altText || ''],
      isMain: [data?.isMain || false],
      sortOrder: [data?.sortOrder || 1]
    });
  }

  addImage() {
    this.images.push(this.createImageGroup());
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

loadProduct(id: string) {
  this.loadingData = true;
  this.service.getProductByID(id).subscribe({
    next: (res:any) => {
      const product = res.data;

      this.productForm.patchValue({
        name: product.name,
        categoryName: product.categoryName,
        discountedPrice: Number(product.discountedPrice),
        actualPrice: Number(product.actualPrice),
        stockCount: Number(product.stockCount),
        description: product.description,
        isStock: product.isStock
      });

      this.images.clear();
      if (product.images?.length) {
        product.images.forEach((img: any) => this.images.push(this.createImageGroup(img)));
      }

      this.loadingData = false;
    },
    error: () => {
      this.loadingData = false;
    }
  });
}

  onSave() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const productData = this.productForm.value;

    if (this.productId) {
      this.service.updateProduct(this.productId, productData).subscribe({
        next: () => {
          this.loading = false;
          this.alertService.showAlert({
            message: 'Product Updated',
            type: 'success',
            autoDismiss: true,
            duration: 4000
          });
          this.router.navigate(['/products', this.productId]);
        },
        error: () => (this.loading = false)
      });
    } else {
      this.service.createNewProduct(productData).subscribe({
        next: (res:any) => {
          this.loading = false;
          this.alertService.showAlert({
            message: 'Product Added',
            type: 'success',
            autoDismiss: true,
            duration: 4000
          });
          this.router.navigate(['/products', res.data.id]);
        },
        error: () => (this.loading = false)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/products']);
  }
}
