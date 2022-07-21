import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  feed: string[] = [];
  authenticated!: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.authenticated = true;
    }
  }

}
