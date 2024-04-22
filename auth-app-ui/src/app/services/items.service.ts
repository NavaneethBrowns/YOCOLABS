import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private apiURL: string = '';
  private accessToken: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.apiURL = environment.apiURL;
    this.accessToken = sessionStorage.getItem('accessToken') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    });
  }

  getItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/item/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getItems(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/items`, {
      params: params,
      headers: this.getHeaders(),
    });
  }

  addItem(item: any): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/addItem`, item, {
      headers: this.getHeaders(),
    });
  }

  updateItem(id: number, item: any): Observable<string> {
    return this.http.put<string>(`${this.apiURL}/updateItem/${id}`, item, {
      headers: this.getHeaders(),
    });
  }

  deleteItem(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiURL}/delete/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
