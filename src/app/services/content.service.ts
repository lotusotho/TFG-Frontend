import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  getUsernameByToken(): Observable<string> {
    return this.http
      .get(`${API_URL}/tokenusername`, { withCredentials: true })
      .pipe(map((response: any) => response.username));
  }

  getUserContent(): Observable<any> {
    return this.http
      .get(`${API_URL}/usercontent`, { withCredentials: true })
      .pipe(map((response: any) => response.content.md_content));
  }
}
