import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../contants.js';
import { AuthService } from './auth.service.js';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  username: string;
  type: number;
  iat: number;
  exp: number;
}

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

  getUsernameFromToken(): string | null {
    const token = this.authService.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.username;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
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
