import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host: string = "http://localhost:8089";

  constructor(private http:HttpClient) { }

  getProducts(page: number = 1, size: number = 4): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products?_page=${page}&_limit=${size}`);
  }


  public checkProducts(product: Product){
    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      {checked: !product.checked});
  }
  public deleteProduct(product: Product){
    return this.http.delete<Product>(`${this.host}/products/${product.id}`);
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(`${this.host}/products`,
      product);
  }
  public searchProducts(keyword:string){
    return this.http.get<Array<Product>>(`${this.host}/products?name=${keyword}`);
  }

  getProductsById(productId: number) {
    return this.http.get<Product>(`${this.host}/products/${productId}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.host}/products/${product.id}`,product);
  }
}
