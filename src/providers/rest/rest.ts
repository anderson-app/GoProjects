import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  private token = '';
  private apiUrl = 'http://34.214.164.73/api/';

  constructor(public http: Http) {
  this.token = window.sessionStorage.accessToken;
    if(this.token && this.token.length > 50) {
        //Redirect to login
    } else {
        this.login();
    }
  }

  updateToken(token) {
    this.token = token;
    window.sessionStorage.accessToken = this.token;
  }

  login() {
    this.login({"email": "johndoe@example.com", "password": "johndoe"})
        .subscribe(
          data => this.updateToken(data.data.token),
          error =>  this.errorMessage = <any>error);
    }

  login(data): Observable<string[]> {
  return this.http.post(this.apiUrl + 'auth/login', data)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
