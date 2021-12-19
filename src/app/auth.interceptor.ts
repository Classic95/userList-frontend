import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { GlobalSelectionService } from './services/global-selection.service';
import { SharedService } from './services/shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private GLOBAL: GlobalSelectionService,private SS: SharedService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.SS.getStorageItem('token');
    request = request.clone({
      setHeaders: {
        ContentType: 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      }
    });
    return next.handle(request)
  }
}
