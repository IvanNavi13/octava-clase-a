import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class ValidatorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // console.log(request);
    let name: string = request.url.split('/').pop()!;
    if(name.length > 4){
      return next.handle(request);
    }
    return EMPTY
  }
}
