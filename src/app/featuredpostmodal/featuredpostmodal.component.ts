import { Component, Input } from '@angular/core';
import { FeaturedPosts } from '../../types/types.js';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-featuredpostmodal',
  standalone: true,
  imports: [NgFor],
  templateUrl: './featuredpostmodal.component.html',
  styleUrl: './featuredpostmodal.component.css',
})
export class FeaturedpostmodalComponent {
  @Input() featuredPosts: FeaturedPosts[] = [];
}
