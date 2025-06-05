import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featuredpostmodal',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './featuredpostmodal.component.html',
  styleUrl: './featuredpostmodal.component.css',
})
export class FeaturedpostmodalComponent {
  @Input() allPostsData: any[] = [];
}
