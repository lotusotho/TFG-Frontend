import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { FeaturedPosts } from '../../types/types.js';
import { FeaturedpostmodalComponent } from '../featuredpostmodal/featuredpostmodal.component';

@Component({
  selector: 'app-featuredpost',
  standalone: true,
  imports: [NgFor, FeaturedpostmodalComponent],
  templateUrl: './featuredpost.component.html',
  styleUrl: './featuredpost.component.css',
})
export class FeaturedpostComponent {
  featuredPosts: FeaturedPosts[] = [
    {
      title: 'Hatsune Miku 💙',
      description:
        '¡Hola! Soy Hatsune Miku, una cantante virtual con una voz única y una gran pasión por la música. En mi blog, compartiré mis proyectos y conciertos.',
      img: 'assets/img/miku_banner.jpg',
      alt: 'Hatsune Miku Banner',
      date: '14:30 PM - 27 diciembre 2007',
    },
    {
      title: 'Kagamine Len 💛',
      description:
        '¡Hola! Soy Len Kagamine, un cantante energético y siempre listo para una nueva aventura. ¡Sigue mi blog para conocer mis últimas noticias y proyectos!',
      img: 'assets/img/len_banner.jpg',
      alt: 'Len Kagamine Banner',
      date: '14:30 PM - 27 diciembre 2007',
    },
    {
      title: 'Kagamine Rin 💛',
      description:
        '¡Hola a todos! Soy Rin Kagamine, una cantante llena de vida y entusiasmo. ¡No te pierdas mis publicaciones para estar al tanto de mis aventuras y canciones!',
      img: 'assets/img/rin_banner.jpg',
      alt: 'Rin Kagamine Banner',
      date: '14:30 PM - 27 diciembre 2007',
    },
    {
      title: 'Kaito 💙',
      description:
        '¡Saludos! Soy Kaito, un cantante con una voz profunda y carismática. En mi blog, compartiré mis experiencias y novedades musicales. ¡Acompáñame en este viaje!',
      img: 'assets/img/kaito_banner.jpg',
      alt: 'Kaito Banner',
      date: '14:30 PM - 27 diciembre 2007',
    },
    {
      title: 'Meiko 💜',
      description:
        '¡Hola! Soy Meiko, una cantante apasionada y poderosa. En mi blog, encontrarás mis pensamientos, proyectos y todo lo relacionado con mi música. ¡No te lo pierdas!',
      img: 'assets/img/meiko_banner.jpg',
      alt: 'Meiko Banner',
      date: '14:30 PM - 27 diciembre 2007',
    },
    {
      title: 'Utatane Piko 🤍',
      description:
        '¡Hola! Soy Utatane Piko, un cantante con una voz única y versátil. En mi blog, compartiré mis experiencias, proyectos y todo lo relacionado con mi música.',
      img: 'assets/img/utatane_banner.jpg',
      alt: 'Utatane Piko Banner',
      date: '14:30 PM - 27 diciembre 2007',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
