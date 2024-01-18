import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private router: Router, private http: HttpClient) {}

  redirectToUserForm() {
    const apiUrl = 'http://localhost:8080/add'; 

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.router.navigate(['/user-form']);
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }
}