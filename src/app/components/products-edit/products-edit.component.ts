import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();

    // const sampleProduct = {
    //   name: "Period Pain Relief Heat Patch",
    //   categoryName: "Women's Sanitary Items",
    //   discountedPrice: 199,
    //   actualPrice: 249,
    //   stockCount: 600,
    //   description: "Self-heating period pain relief patch designed to soothe abdominal cramps during menstruation. Provides up to 8 hours of gentle, consistent warmth to relax muscles and reduce discomfort. Slim, discreet, and easy to wear under clothing.",
    //   isStock: true,
    //   images: [
    //     {
    //       url: "https://example.com/images/heat-patch.jpg",
    //       altText: "Period pain relief heat patch packaging",
    //       isMain: true,
    //       sortOrder: 1
    //     }
    //   ]
    // };

    // this.productForm.patchValue(sampleProduct);
    // sampleProduct.images.forEach(img => this.images.push(this.createImageGroup(img)));
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

  onSave() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const productData = this.productForm.value;
    console.log('Saving product:', productData);

    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  onCancel() {
    this.productForm.reset();
  }
}
