import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { ContentService } from '../services/content.service.js';

@Component({
  selector: 'app-featuredpost',
  standalone: true,
  imports: [NgFor],
  templateUrl: './featuredpost.component.html',
  styleUrl: './featuredpost.component.css',
})
export class FeaturedpostComponent implements OnInit {
  allPostsData: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.contentService.getAllPosts().subscribe({
      next: (response: any) => {
        this.allPostsData = response.data;
      },
      error: (error: any) => {
        console.log('Error getting all posts', error);
      },
    });
  }
  // Functions to open and close a modal
  openModal($el: HTMLElement) {
    $el.classList.add('is-active');
  }

  closeModal($el: HTMLElement) {
    $el.classList.remove('is-active');
  }

  closeAllModals() {
    if (isPlatformBrowser(this.platformId)) {
      document.querySelectorAll('.modal').forEach(($modal) => {
        this.closeModal($modal as HTMLElement);
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.querySelectorAll('.js-modal-trigger').forEach(($trigger) => {
        const modal = ($trigger as HTMLElement).dataset['target'];
        const $target = document.getElementById(modal!);

        $trigger.addEventListener('click', () => {
          if ($target) {
            this.openModal($target);
          }
        });
      });

      document
        .querySelectorAll(
          '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button'
        )
        .forEach(($close) => {
          const $target = $close.closest('.modal');

          $close.addEventListener('click', () => {
            if ($target) {
              this.closeModal($target as HTMLElement);
            }
          });
        });
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    this.closeAllModals();
  }
}
