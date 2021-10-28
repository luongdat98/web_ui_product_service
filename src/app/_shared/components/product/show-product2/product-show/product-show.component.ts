import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductNewData, ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})
export class ProductShowComponent implements OnInit {
  ProductList: ProductNewData| any;
  nameProductSearch:any;
  flexRadioDefault:any = 0;
  displayedColumns: string[] = ['productId', 'nameProduct', 'price'];

  pageEvent: PageEvent | any;

  constructor(private productService: ProductService, private router:Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.refreshProList();
  }

  refreshProList(){
    this.productService.findAllProduct(1, 20).pipe(
      tap(productData => console.log(productData)),
      map((productData:ProductNewData| any) => {
        this.ProductList = productData;
        console.log("data:");
        console.log(this.ProductList);})  
    ).subscribe();
  };

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;
    
    this.productService.findAllProduct(page, size).pipe(
      tap(productData => console.log(productData)),
      map((productData:ProductNewData| any) => {
        this.ProductList = productData;
        console.log("data:");
        console.log(this.ProductList);})  
    ).subscribe();
  };

}
