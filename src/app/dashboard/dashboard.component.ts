import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { marked } from 'marked';
import { MdinfoComponent } from '../mdinfo/mdinfo.component.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MarkdownModule],
  providers: [MarkdownService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formContent: FormGroup;
  username = '';
  markdownContent = '';
  userContent = 'Initial value';
  text_content: any;
  current_phrase: string = '';

  phrases: string[] = [
    '¿Qué se te ocurre hoy?',
    '¡Escribe algo interesante!',
    '¡Hora de escribir!',
    'Buenos días, ',
  ];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.formContent = this.fb.group({
      text_content: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    this.getUsernameByToken();
    this.getUserContent();
    this.choosePhrase();
  }

  choosePhrase() {
    this.current_phrase =
      this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  postContent() {
    if (this.formContent.valid) {
      const markdown = this.formContent.value.text_content;
      this.text_content = this.convertMarkdownToJson(markdown);
      this.http
        .post(
          'http://localhost:3000/submitcontent',
          { text_content: this.text_content, md_content: markdown },
          {
            withCredentials: true,
          }
        )
        .subscribe({
          next: (response: any) => {
            console.log('Content posted', response);
          },
          error: (error) => {
            console.error('Error posting content:', error);
          },
        });
    }
  }

  getUsernameByToken() {
    this.http
      .get('http://localhost:3000/tokenusername', { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          this.username = response.username as string;
        },
        error: (error) => {
          console.error('Error fetching secure data:', error);
        },
      });
  }

  getUserContent() {
    this.http
      .get('http://localhost:3000/usercontent', { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log('Response from server:', response); // Verificar el contenido de la respuesta
          this.userContent = response.content.md_content;
          this.markdownContent = this.userContent;
          this.formContent.patchValue({
            text_content: this.userContent,
          });
          console.log('Converted Markdown:', this.userContent); // Verificar el contenido convertido
        },
        error: (error) => {
          console.error('Error fetching secure data:', error);
        },
      });
  }

  convertMarkdownToJson(markdown: string): any {
    const tokens = marked.lexer(markdown);
    return tokens;
  }

  convertJsonToMarkdown(tokens: any): string {
    return marked.parser(tokens);
  }
}
