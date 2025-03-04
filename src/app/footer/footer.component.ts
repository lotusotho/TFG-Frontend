import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  date: number = 0;

  ngOnInit(): void {
    this.date = DateTime.now().year;
  }
}
