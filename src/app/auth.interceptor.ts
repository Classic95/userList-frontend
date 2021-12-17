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

    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.GLOBAL.user.token,
      }
    });
    return next.handle(request)
  }
}
