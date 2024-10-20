import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions : Array<any> = [
    {
      title: "home", route : "/admin/home", icon :"house"
    },
    {
      title: "Products", route : "/admin/products", icon :"search"
    },
    {
      title: "New Product", route : "/admin/new-product", icon :"save"
    },

  ];
  currentAction : any;

  constructor(public appState:AppStateService,
              public loading:LoadingService,
              private router:Router) {
  }

  setCurrentAction(action: any) {
    this.currentAction = action;

  }

  logout() {
    this.appState.authState={};
    this.router.navigateByUrl("/login");
  }
  login() {
    this.router.navigateByUrl("/login");
  }
}
