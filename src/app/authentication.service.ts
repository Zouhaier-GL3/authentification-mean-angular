import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";



@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private token!: string;
  private endpoint: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

// Sign-in
public  login(user: any): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user,this.httpOptionsPost ).pipe(catchError(this.handleError));
};

// Sign-up
public   register(user: any): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user,this.httpOptionsPost).pipe(catchError(this.handleError));
};
// get profile
profile(): Observable<any> {
    return this.http
    .get<any>(this.endpoint + '/bugtracking/')
    .pipe(retry(1), catchError(this.handleError));
}

public getUserDetails(): any {
    const token = localStorage.getItem("mean-token");;
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
}

public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
}

private saveToken(token: string): void {
  localStorage.setItem("mean-token", token);
  this.token = token;
};

// private getToken(): string {
//   if (!this.token) {
//     this.token = localStorage.getItem("mean-token");
//   }
//   return this.token;
// };
public logout(): void {
  this.token = "";
    window.localStorage.removeItem("mean-token");
  this.router.navigateByUrl("/");
}
// Error
handleError(error: HttpErrorResponse) {
  let msg = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    msg = error.error.message;
  } else {
    // server-side error
    msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(msg);
}

httpOptionsPost = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept, X-Custom-Header, Upgrade-Insecure-Requests',
  })
};

httpOptionsGet = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};
}
