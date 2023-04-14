import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId: any;
  userDetails: any = {};

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.userId = id;
      this.getUserDetails(id);
    });
  }

  getUserDetails(id: number) {
    this.httpClient
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .subscribe({
        next: (res: any) => (this.userDetails = res),
        error: (error: any) => console.error('Error: ' + error),
      });
  }
}
