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
  jobTitle: string = '';
  company: string = 'chewy';
  searchResults: any[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  // Search function that makes an API request
  searchJobs() {
    // Reset error and previous results before starting the search
    this.errorMessage = null;
    this.searchResults = [];
    this.isLoading = true;

    // API endpoint URL (replace with your actual endpoint)
    const apiUrl = 'https://your-api-endpoint.com/jobs';

    // Pass search parameters to the API
    this.http.get<any[]>(apiUrl, {
      params: {
        jobTitle: this.jobTitle,
        company: this.company
      }
    })
        .subscribe(
            (data) => {
              this.searchResults = data;  // Update search results with the response
              this.isLoading = false;      // Stop loading animation
            },
            (error) => {
              this.errorMessage = 'Failed to load jobs. Please try again later.'; // Handle error
              this.isLoading = false;
            }
        );
  }
}
