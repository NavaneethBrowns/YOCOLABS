import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL:string = '';

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  login(creds:any): Observable<any> {
    return this.http.post(`${this.apiURL}/login`,creds);
  }

  signup(creds:any): Observable<any> {
    return this.http.post(`${this.apiURL}/signup`,creds);
  }
}
