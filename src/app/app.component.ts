import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'expenses-app';
  constructor(private translate: TranslateService, 
    private authService: AuthService,
    private router: Router) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/feed']);
    }
  }
}
