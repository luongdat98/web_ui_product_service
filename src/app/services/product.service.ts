import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../_shared/constants/models/Product';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { APIUrl } from 'src/environments/environment';

// Moi  them
export interface ProductNewData{
  items: Product[],
  meta:{
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  },
  links:{
    first: string;
    previous: string;
    next: string;
    last: string;
  }
};

export interface ProductData{
  items:Product[];
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  keySearch : any;
  IdCategory: any;

  constructor(private http: HttpClient) { }

  getAllProduct(page: number, size: number, search:string | any, idCategory: number):Observable<any>{
    this.keySearch = search;
    this.IdCategory = idCategory;

    if(this.IdCategory > 0 &&  this.keySearch == null){
      return this.getProductFilterWithoutSearch(page, size, idCategory);
    }
    else if(this.IdCategory && this.keySearch != null){
      return this.getProductFilterWithSearch(page, size, search, idCategory);
    }
    else if(this.IdCategory == 0 && this.keySearch != null){
      return this.getProductWithSearch(page, size, search);
    }
    else{
      return this.getProductWithoutSearch(page, size);
    }
  };

  addProduct(val:any){
    return this.http.post(`${APIUrl}/Product/addproduct`,val);
  };

  updateProduct(val:any){
    return this.http.put(`${APIUrl}/Product`,val);
  };

  deleteProduct(val:any){
    console.log("Gia tri o serveic:" + val);
    const url = `${APIUrl}/Product/${val.id}`;
    return this.http.delete(url, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  };

  getProductById(id:number):Observable<any>{
    return this.http.get<any>(`${APIUrl}/Product/id?id=${id}`).pipe(
      tap((productData) => {
        console.log("Get Product By Id");
        console.log(productData);
      }),
      catchError(err => throwError(err))
    );
  };

  // Moi them, chua sai den
  findAllProduct(page:number, size:number):Observable<ProductNewData>{
    let params = new HttpParams();
    params = params.append('PageNumber', String(page));
    params = params.append('PageSize', String(size));

    return this.http.get(`${APIUrl}/Product/search`, {params}).pipe(
      map((productNewData: ProductNewData | any) => productNewData),
      catchError(err => throwError(err))
    );
  };

  private getProductFilterWithoutSearch(page: number, size: number, idCategory: number){
    let params = new HttpParams();
    params = params.append('PageNumber', String(page));
    params = params.append('PageSize', String(size));
    params = params.append('idCategory', String(idCategory));

    return this.http.get(`${APIUrl}/Product/search`, {params}).pipe(
      map((productData:any) => productData),
      catchError(err => throwError(err))
    );
  };
  
  private getProductFilterWithSearch(page: number, size: number, search:string,idCategory: number){
    let params = new HttpParams();
    params = params.append('PageNumber', String(page));
    params = params.append('PageSize', String(size));
    params = params.append('searchProduct', String(search));
    params = params.append('idCategory', String(idCategory));

    return this.http.get(`${APIUrl}/Product/search`, {params}).pipe(
      map((productData:any) => productData),
      catchError(err => throwError(err))
    );
  };

  private getProductWithoutSearch(page: number, size: number){
    let params = new HttpParams();
    params = params.append('PageNumber', String(page));
    params = params.append('PageSize', String(size));

    return this.http.get(`${APIUrl}/Product/search`,{params}).pipe(
        map((productData:any) => productData),
        catchError(err => throwError(err))
      );
  };

  private getProductWithSearch(page: number, size: number, search:string){
    let params = new HttpParams();
    params = params.append('PageNumber', String(page));
    params = params.append('PageSize', String(size));
    params = params.append('searchProduct', String(search));

    return this.http.get(`${APIUrl}/Product/search`,{params}).pipe(
        map((productData:any) => productData),
        catchError(err => throwError(err))
      );
  };

    // getAllProduct(page: number, size: number, search:string | any):Observable<any>{
  //   this.keySearch = search;

  //   if(this.keySearch != null){
  //     return this.getProductWithSearch(page, size, search);
  //   }
  //   else{
  //     return this.getProductWithoutSearch(page, size);
  //   }
  // };
}
