import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-featuredpostmodal',
  standalone: true,
  imports: [NgFor],
  templateUrl: './featuredpostmodal.component.html',
  styleUrl: './featuredpostmodal.component.css',
})
export class FeaturedpostmodalComponent {
  @Input() allPostsData: any[] = [];
}
