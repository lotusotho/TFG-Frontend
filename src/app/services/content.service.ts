import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../contants.js';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private API_URL = API_URL;

  constructor(private http: HttpClient) {}

  postContent(text_content: any, md_content: string): Observable<any> {
    return this.http.post(
      `${this.API_URL}/submitcontent`,
      { text_content, md_content },
      { withCredentials: true }
    );
  }

  getUsernameByToken(): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(
      `${this.API_URL}/tokenusername`,
      { withCredentials: true }
    );
  }

  getUsername(): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(`${this.API_URL}/username`);
  }

  getUserContent(): Observable<{ content: { md_content: string } }> {
    return this.http.get<{ content: { md_content: string } }>(
      `${this.API_URL}/usercontent`,
      { withCredentials: true }
    );
  }

  getUserContentQuery(blog: string): Observable<{ content: string }> {
    return this.http.get<{ content: string }>(`${this.API_URL}/userpage`, {
      params: { blog },
      withCredentials: true,
    });
  }
}
