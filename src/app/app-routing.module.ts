import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {Auth} from "./guards/auth.guard";
import {Authori} from "./guards/authori.guard";
import {NotAuthoriComponent} from "./not-authori/not-authori.component";

const routes: Routes = [
  {
    path : "login", component : LoginComponent
  },
  {
    path: "admin", component:AdminTemplateComponent, canActivate:[Auth], children: [
      {
        path : "products", component : ProductsComponent
      },
      {
        path : "new-product" , component : NewProductComponent, canActivate: [Authori]
      }
      ,
      {
        path : "editProduct/:id" , component : EditProductComponent,canActivate: [Authori]
      },
      {
        path : "home", component : HomeComponent
      },
      {
        path : "notAuthori", component : NotAuthoriComponent
      }
    ]
  },


  {
    path : "", redirectTo: "login", pathMatch:'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
