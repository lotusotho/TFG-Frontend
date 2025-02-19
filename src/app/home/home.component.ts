import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { NgxTypedWriterModule } from 'ngx-typed-writer';
import { faker } from '@faker-js/faker';
import { FeaturedpostComponent } from '../featuredpost/featuredpost.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MarkdownModule,
    NgxTypedWriterModule,
    FeaturedpostComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  preserveWhitespaces: true,
})
export class HomeComponent implements OnInit {
  usernames: string[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      let username = faker.internet.username();
      if (!username.includes('.')) {
        this.usernames.push(username);
      }
    }
  }
}
