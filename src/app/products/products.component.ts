import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  constructor(private ps:ProductService, private router:Router
  ,public appState:AppStateService) {
  }



  handleCheckProduct(product: Product) {
    this.ps.checkProducts(product).subscribe({
      next: updatedProduct =>{
        //product.chekced=!product.chekced;
        this.getProducts();
      }
    })


  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(page: number = 1): void {
    this.ps.getProducts(page, this.appState.productState.pageSize)
      .subscribe({
        next: data => {
          this.appState.productState.products = data;
          // Calcul du nombre total de produits
          this.appState.productState.totalProducts = this.appState.productState.currentPage * this.appState.productState.pageSize + data.length - this.appState.productState.pageSize;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  getPage(page: number): void {
    this.appState.productState.currentPage = page;
    this.getProducts(page);
  }

  previousPage(): void {
    if (this.appState.productState.currentPage > 1) {
      this.getPage(this.appState.productState.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.appState.productState.currentPage < this.appState.productState.totalPages) {
      this.getPage(this.appState.productState.currentPage + 1);
    }
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sure?"))
    this.ps.deleteProduct(product).subscribe({
      next: value => {
        //this.appState.productState.products.filter((p:any)=>p.id!=product.id);
      this.searchProduct();
      }
    });
  }

  searchProduct() {
    this.appState.setProductState({
      status:"LOADING"
    })
   this.ps.searchProducts(this.appState.productState.keyword).subscribe({
     next: value => {
       this.appState.productState.products=value;
     }
   })
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`);
  }
}
