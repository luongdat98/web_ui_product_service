import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_shared/constants/models/Product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})


export class AddEditProductComponent implements OnInit {

  CategoryList:any=[];
  SupplierList:any=[];
  addNewProductForm:any = FormGroup;
  paramProductId:number | any = this.routerActive.snapshot.params.id;
  Title:string | any;
  EditProductList:any = [];

  constructor(private productService: ProductService, private categoryService:CategoryService,
            private supplierService: SupplierService, private formBuilder: FormBuilder,
            private routerActive: ActivatedRoute, private route:Router,) { }

  ngOnInit(): void {
    if(this.paramProductId != null){
      this.Title = "Edit Product";    
      this.initForm();
      this.UpdateProductToForm(this.paramProductId);
      this.dropDownCategory();
      this.dropDownSupplier();
    }
    else{
      this.Title = "Add Product";
      this.initForm();
      this.dropDownCategory();
      this.dropDownSupplier();
    }
  };

  initForm(){
    this.addNewProductForm = this.formBuilder.group({
      productId:[null, []],
      nameProduct:[null, [
        Validators.required,
        Validators.minLength(2)
      ]],
      description:[null, [
        Validators.required,
        Validators.minLength(2)
      ]],
      price:[null, [
        Validators.required,
        Validators.minLength(1)
      ]],
      releaseDate:[null, [
        Validators.required,
        Validators.minLength(1)
      ]],
      discontinuedDate:[null, [
        Validators.required,
        Validators.minLength(1)
      ]],
      rating:[null, [
        Validators.required,
        Validators.minLength(1)
      ]],
      categoryId:[null, [
        Validators.required,
        Validators.minLength(1)
      ]],
      supplierId:[null, [
        Validators.required,
        Validators.minLength(1)
      ]]
    })
  };

  dropDownCategory(){
    this.categoryService.getCategories().pipe(
      map((category:any)=>{
        console.log(category);
        this.CategoryList = category;
      })
    ).subscribe();
  };

  dropDownSupplier(){
    this.supplierService.getSuppliers().pipe(
      map((supplier:any)=>{
        console.log(supplier);
        this.SupplierList = supplier;
      })
    ).subscribe();
  };

  comeBack(){
    this.route.navigate(['product']);
  };

  UpdateProductToForm(id:number){
    this.productService.getProductById(this.paramProductId).subscribe((result) =>{
      this.addNewProductForm = this.formBuilder.group({
        productId:[this.paramProductId, []],
        nameProduct:[result['nameProduct'], [
          Validators.required,
          Validators.minLength(2)
        ]],
        description:[result['description'], [
          Validators.required,
          Validators.minLength(2)
        ]],
        price:[result['price'], [
          Validators.required,
          Validators.minLength(1)
        ]],
        releaseDate:[result['releaseDate'], [
          Validators.required,
          Validators.minLength(1)
        ]],
        discontinuedDate:[result['discontinuedDate'], [
          Validators.required,
          Validators.minLength(1)
        ]],
        rating:[result['rating'], [
          Validators.required,
          Validators.minLength(1)
        ]],
        categoryId:[result['categoryId'], [
          Validators.required,
          Validators.minLength(1)
        ]],
        supplierId:[result['supplierId'], [
          Validators.required,
          Validators.minLength(1)
        ]]
      })
    })
  };
 
  addProduct(){
    this.productService.addProduct(this.addNewProductForm.value).pipe(
      map(result => this.route.navigate(['product']))
    ).subscribe();
  };

  updateProduct(){
    this.productService.updateProduct(this.addNewProductForm.value).pipe(
      map(result => this.route.navigate(['product']))
    ).subscribe();
  };

   // onSubmit(){
  //   if(this.addNewProductForm.invalid){
  //     return;
  //   }
  //   console.log(this.addNewProductForm.value);
  //   this.productService.addProduct(this.addNewProductForm.value).pipe(
  //     map(product => this.route.navigate(['home']))
  //   ).subscribe();
  // }
}
