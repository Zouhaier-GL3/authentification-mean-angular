import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';

@Injectable()
export class HundelersInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,private router: Router) {}
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403 || err.status === 504) {
        //navigate /delete cookies or whatever
        this.router.navigateByUrl(`/login`);
        return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem("mean-token")
    console.log(authToken)
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken
      },
    });
    return next.handle(req).pipe(catchError(x=> this.handleAuthError(x)));
  }
}
