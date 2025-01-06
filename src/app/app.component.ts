import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {JobSearchComponent} from "./job-search/job-search.component";

@Component({
  selector: 'app-root',
  imports: [JobSearchComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'job_scraper_frontend';
}
