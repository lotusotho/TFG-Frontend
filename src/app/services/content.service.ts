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

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  postContent(
    title: string,
    emoji: string,
    text_content: any,
    md_content: string,
    options?: { headers: HttpHeaders; withCredentials: boolean }
  ): Observable<any> {
    return this.httpClient.post(
      `${this.API_URL}/submitcontent`,
      { text_content, md_content, title, emoji },
      options
    );
  }

  getUsernameByToken(options?: {
    headers: HttpHeaders;
    withCredentials: boolean;
  }): Observable<{ username: string }> {
    return this.httpClient.get<{ username: string }>(
      `${this.API_URL}/tokenusername`,
      options
    );
  }

  getUserContent(
    blog: string,
    options?: {
      headers: HttpHeaders;
      withCredentials: boolean;
    }
  ): Observable<{ content: { md_content: string } }> {
    return this.httpClient.get<{ content: { md_content: string } }>(
      `${this.API_URL}/usercontent`,
      {
        ...options,
        params: { blog },
      }
    );
  }

  getUserContentQuery(blog: string): Observable<{ content: string }> {
    return this.httpClient.get<{ content: string }>(`${this.API_URL}/posts`, {
      params: { blog },
    });
  }

  getAllPosts() {
    return this.httpClient.get(`${this.API_URL}/posts`);
  }

  deletePost(
    postid: string,
    options?: {
      headers: HttpHeaders;
      withCredentials: boolean;
    }
  ): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/post/${postid}`, {
      ...options,
    });
  }
}
