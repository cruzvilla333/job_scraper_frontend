import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    HttpClientModule
  ],
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent {
  jobTitle: string = 'software engineer';
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
    })
        .subscribe(
            (data: any) => {
              this.searchResults = data.jobs;
              this.isLoading = false;
            },
            () => {
              this.errorMessage = 'Failed to load jobs. Please try again later.';
              this.isLoading = false;
            }
        );
  }
}
