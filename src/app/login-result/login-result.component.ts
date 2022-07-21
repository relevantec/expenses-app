import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login-result',
  templateUrl: './login-result.component.html',
  styleUrls: ['./login-result.component.scss'],
})
export class LoginResultComponent implements OnInit {

  result!: string;
  error: any;
  
  constructor(private router: Router, private authService: AuthService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.result = this.route.snapshot.paramMap.get('token')!;
    this.authService.saveToken(this.result);
    this.router.navigate(['/feed']);
  }

  getInfo() {
    this.authService.getInfo().subscribe({
          next: (v) => v,
          error: (e) => this.error = e,
          complete: () => console.info('complete'),
        });
  }
}
