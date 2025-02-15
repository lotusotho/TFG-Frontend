import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../contants.js';
import { AuthService } from './auth.service.js';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private API_URL = API_URL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  postContent(
    title: string,
    emoji: string,
    text_content: any,
    md_content: string,
    options?: { headers: HttpHeaders; withCredentials: boolean }
  ): Observable<any> {
    return this.http.post(
      `${this.API_URL}/submitcontent`,
      { text_content, md_content, title, emoji },
      options
    );
  }

  getUsernameByToken(options?: {
    headers: HttpHeaders;
    withCredentials: boolean;
  }): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(
      `${this.API_URL}/tokenusername`,
      options
    );
  }

  getUsername(options?: {
    headers: HttpHeaders;
    withCredentials: boolean;
  }): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(
      `${this.API_URL}/username`,
      options
    );
  }

  getUserContent(options?: {
    headers: HttpHeaders;
    withCredentials: boolean;
  }): Observable<{ content: { md_content: string } }> {
    return this.http.get<{ content: { md_content: string } }>(
      `${this.API_URL}/usercontent`,
      options
    );
  }

  getUserContentQuery(blog: string): Observable<{ content: string }> {
    return this.http.get<{ content: string }>(`${this.API_URL}/userpage`, {
      params: { blog },
    });
  }

  getAllPosts(): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(`${this.API_URL}/all-posts`);
  }
}
