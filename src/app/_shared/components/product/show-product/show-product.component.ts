
import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductNewData, ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  ModalTitle:string | any;
  ActivateAddEditProComp:boolean=false;
  dataSource :  any = [];
  nameProduct : any;
  p: any ;
  nameProductSearch:any;
  key: string = "productId";
  reverse: boolean = false;
  Title: string | any;
  CategoryList:any=[];
  flexRadioDefault:any = 0;
// Moi
  ProductList:ProductNewData| any;
  displayedColumns: string[] = ['productId', 'nameProduct', 'description', 'price', 'releaseDate', 'options' ];
  pageEvent: PageEvent | any;


  constructor(private productService: ProductService, private router:Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.refreshProList();
    this.checkRadioCategory();
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;
    
    this.productService.getAllProduct(page, size, this.nameProductSearch, this.flexRadioDefault).pipe(
      map((productData:any) => {
        console.log(productData);
        this.ProductList = productData;})
    ).subscribe();
  };

  refreshProList(){
    this.productService.getAllProduct(1, 10, this.nameProductSearch, this.flexRadioDefault).pipe(
      map((productData:any) => {
        console.log(productData);
        this.ProductList = productData;})
    ).subscribe();
  }

  Search(){
    this.ngOnInit();
    this.ProductList = this.ProductList.filter((res:any) =>{
      return res.nameProduct.toLocaleLowerCase().match(this.nameProductSearch.toLocaleLowerCase());
    });
  };

  sort(key: any){
    this.key = key;
    this.reverse = !this.reverse;
  };

  product:any;
  addProduct(){
    this.router.navigate(['product/add']); 
  };
  
  deleteClick(item: any){
    var value = {
      id: item.productId
    };
    if(confirm('Are you sure?')){
      console.log(value);
      this.productService.deleteProduct(value).subscribe(data=>{
        alert(data.toString());
        this.refreshProList();
      });
    }
  };

  checkRadioCategory(){
    this.categoryService.getCategories().pipe(
      map((category:any)=>{
        // console.log(category);
        this.CategoryList = category;
      })
    ).subscribe();
  };

  onItemChange(value:any){
    console.log(value.target.value);
    this.flexRadioDefault = value.target.value;
    this.ngOnInit();
  };

  

  // Cách 2
  // deleteClick(item: any){
  //   var value = {
  //     id: item.productId
  //   };
  //   if(confirm('Are you sure?')){
  //     console.log(value);
  //     this.productService.deleteProduct(value).subscribe(data=>{
  //       alert(data.toString());
  //       this.refreshProList();
  //     });
  //   }
  // }
}
