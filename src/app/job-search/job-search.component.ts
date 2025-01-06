import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import {catchError, EMPTY} from "rxjs";

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent {
  jobTitle: string = '';
  company: string = 'chewy';
  searchResults: any[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  searchJobs() {
    this.errorMessage = null;
    this.searchResults = [];
    this.isLoading = true;

    const apiUrl = 'http://localhost:8080/get-jobs';

    this.http.get<any[]>(apiUrl, {
      params: {
        jobTitle: this.jobTitle
      }
    }).pipe(
        catchError( () => {
          this.errorMessage = 'Failed to load jobs. Please try again later.';
          this.isLoading = false;
          return EMPTY;
        })
    ).subscribe({
      next: (data: any) => {
        this.searchResults = data.jobs;
        this.isLoading = false;
      }
    });
  }
}
