import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { DatePipe, isPlatformBrowser, NgFor } from '@angular/common';
import { ContentService } from '../services/content.service.js';
import { FeaturedpostmodalComponent } from '../featuredpostmodal/featuredpostmodal.component';

@Component({
  selector: 'app-featuredpost',
  standalone: true,
  imports: [NgFor, DatePipe, FeaturedpostmodalComponent],
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
        setTimeout(() => this.initModalTriggers(), 0);
      },
      error: (error: any) => {
        console.log('Error getting all posts', error);
      },
    });
  }

  private initModalTriggers() {
    if (!isPlatformBrowser(this.platformId)) return;

    document.querySelectorAll('.js-modal-trigger').forEach(($trigger) => {
      const modal = ($trigger as HTMLElement).dataset['target']!;
      const $target = document.getElementById(modal);
      $trigger.addEventListener(
        'click',
        () => $target && this.openModal($target)
      );
    });

    document
      .querySelectorAll(
        '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button'
      )
      .forEach(($close) => {
        const $target = $close.closest('.modal') as HTMLElement | null;
        $close.addEventListener(
          'click',
          () => $target && this.closeModal($target)
        );
      });
  }

  openModal($el: HTMLElement) {
    $el.classList.add('is-active');
  }

  openModalById(modalId: string) {
    const el = document.getElementById(modalId);
    if (el) this.openModal(el);
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
    this.initModalTriggers();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    this.closeAllModals();
  }
}
