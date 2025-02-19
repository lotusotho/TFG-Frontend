import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { marked } from 'marked';
import { Router } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { AuthService } from '../../services/auth.service.js';
import { NgClass, NgIf } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule,
    PickerModule,
    NgIf,
    NgClass,
  ],
  providers: [MarkdownService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formContent: FormGroup;
  username = '';
  userContent: any;
  text_content: any;
  current_phrase: string = '';
  selectedEmoji: string = '';
  showEmojiPicker: boolean = false;

  phrases: string[] = [
    '¿Qué se te ocurre hoy?',
    '¡Escribe algo interesante!',
    '¡Hora de escribir!',
    'Buenos días, ',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contentService: ContentService,
    private authService: AuthService
  ) {
    this.formContent = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      emoji: ['', [Validators.required]],
      text_content: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    this.getUsernameByToken();
    this.choosePhrase();
  }

  choosePhrase() {
    this.current_phrase =
      this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  postContent() {
    if (this.formContent.valid) {
      const markdown = this.formContent.value['text_content'];
      this.text_content = this.convertMarkdownToJson(markdown);
      const headers = this.authService.getAuthHeaders();
      this.contentService
        .postContent(
          this.formContent.value['title'],
          this.formContent.value['emoji'],
          this.text_content,
          markdown,
          {
            headers,
            withCredentials: true,
          }
        )
        .subscribe({
          next: (response) => {
            console.log('Content posted', response);
            this.router.navigate(['/userblog'], {
              queryParams: { blog: this.username.toLowerCase().trim() },
            });
          },
          error: (error) => {
            console.error('Error posting content:', error);
          },
        });
    }
  }

  getUsernameByToken() {
    const headers = this.authService.getAuthHeaders();
    this.contentService
      .getUsernameByToken({ headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          this.username = response.username as string;
          this.getUserContent();
        },
        error: (error) => {
          console.error('Error fetching secure data:', error);
        },
      });
  }

  getUserContent() {
    const headers = this.authService.getAuthHeaders();
    this.contentService
      .getUserContent(this.username, { headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log('Response from server:', response);
          this.userContent = response.data[0];

          this.formContent.patchValue({
            title: this.userContent.title,
            emoji: this.userContent.emoji,
            text_content: this.userContent.md_content,
          });
          console.log('Converted Markdown:', this.userContent.md_content);
        },
        error: (error) => {
          console.error('Error fetching secure data:', error);
        },
      });
  }

  deletePost() {
    const postid = this.userContent.ID;
    const headers = this.authService.getAuthHeaders();

    this.contentService
      .deletePost(postid, { headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
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

  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  selectEmoji(event: any): void {
    const emoji = event.emoji.native;
    this.selectedEmoji = emoji;
    this.formContent.patchValue({ emoji });
    this.toggleEmojiPicker();
  }
}
