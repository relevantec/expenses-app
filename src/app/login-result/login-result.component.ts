import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login-result',
  templateUrl: './login-result.component.html',
  styleUrls: ['./login-result.component.scss'],
})
export class LoginResultComponent implements OnInit {
  url!: string;
  clientId = 'com.leadag.digitizer';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.url = this.router.url.split('#')[1];
  }

  getToken() {
    this.authService.postCode(this.url, this.clientId).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
}
