import { Component, Inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';     
import { AuthService } from '../_services/auth.service';
      

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  @ViewChild ('authForm') authForm!: NgForm;

  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onClick() { 
    window.location.href = 'https://expenses.ldisol.bg/lds/login';
  }

}
