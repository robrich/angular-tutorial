import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { User } from '../classes/user';

@Injectable()
export class AuthService {
  private url: string = `${environment.apiBaseUrl}/user`;
  private cookieKey: string = "currentUser";
  private options = new RequestOptions({ withCredentials: true });

  constructor(private http: Http, private cookieService: CookieService) {
  }

  private getUser(): User {
    return <User>this.cookieService.getObject(this.cookieKey)
  }

  private setUser(value: User) {
    this.cookieService.putObject(this.cookieKey, value);
  }

  clearUser() {
    this.cookieService.remove(this.cookieKey);
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get(this.url + '/identity', this.options)
      .map((res: Response) => {
        if (res) {
          return Observable.of(true);
        }
        this.clearUser();
        return Observable.of(false);
      })
      .catch((error: Response) => {
        if (error.status !== 403) {
          console.log('isAuthenticated error', error)
        }

        this.clearUser();

        return Observable.of(false);
      });
  }

  login(email: string, password: string): Observable<boolean | Response> {
    let loginInfo = { "email": email, "password": password };
    console.log(loginInfo);
    return this.http.put(`${this.url}/login`, loginInfo, this.options)
      .do((res: Response) => {
        if (res) {
          this.setUser(<User>res.json());
        }
      })
      .catch(error => {
        console.log('login error', error)
        return Observable.of(false);
      });
  }

  signup(email: string, password: string) {
    let loginInfo = { "email": email, "password": password };
    return this.http.post(this.url, loginInfo, this.options)
      .do((res: Response) => {
        if (res) {
          this.setUser(<User>res.json());
        }
      })
      .catch(error => {
        console.log('signup error', error)
        return Observable.of(false);
      });
  }

  logout(): Observable<boolean> {
    return this.http.get(`${this.url}/logout`, this.options)
      .map((res: Response) => {
        if (res.ok) {
          this.clearUser();
          return Observable.of(true);
        }

        return Observable.of(false);
      })
      .catch(error => {
        console.log('logout error', error)
        return Observable.of(false);
      });
  }

}
