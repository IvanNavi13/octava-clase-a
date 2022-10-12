import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, concatMap, map, Observable, of, throwError, tap, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import StorageHelper from '../helpers/storage.helper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // console.log(request)
    if (request.url.includes("/mirror/")) {
      console.log(StorageHelper.getItem('session'))
      let originalRequest = request
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + StorageHelper.getItem('session').token
        }
      })
      return next.handle(request).pipe(
        catchError((err: any) => {
          console.log("catch", err)
          if (err instanceof HttpErrorResponse && err.status === 401) {
            console.log("IN RESPONSE ERROR")
            return this.expiredHandler(originalRequest, next)
          }
          return throwError(() => err)
        })
      );
    }
    return next.handle(request);
  }

  private expiredHandler(originalRequest: HttpRequest<unknown>, next: HttpHandler) {
    return this.apiService.refreshToken().pipe(
      // tap(console.log)
      switchMap((respToken) => {  //Sirve para controlar lo del catchError y volver al flujo original(principal). por eso mismo siempre se utiliza switchmap
        StorageHelper.setItem('session', respToken)
        originalRequest = originalRequest.clone({
          setHeaders: {
            Authorization: 'Bearer ' + StorageHelper.getItem('session').token
          }
        })
        return next.handle(originalRequest)
      })
    )
  }
}
