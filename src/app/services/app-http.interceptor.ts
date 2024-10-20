import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private appState:AppStateService,
              private loading:LoadingService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 /* this.appState.setProductState({
      status:"LOADING"
    }) */
    let request = req.clone({
      headers: req.headers.set("Authorization","Bearer JWT")
    });
    return next.handle(req).pipe(
      finalize(()=>{
      /*  this.appState.setProductState({
          status:"LOADED"
        }) */
        this.loading.hideLoading();
      })
    );
  }

}

