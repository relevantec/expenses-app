import { HttpClient } from '@angular/common/http';
import { Component, Inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';     
      

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  @ViewChild ('authForm') authForm!: NgForm;

  redirectUrl: string = 'http://localhost:8080/login-result';
  constructor() { }

  ngOnInit(): void {
  }

  onClick() { 
    window.location.href = 'https://www.marketcircle.com/account/oauth/authorize?' + 
     'client_id=' + encodeURIComponent('com.leadag.digitizer') + '&response_type=code' + '&scope=daylite:read';
  }

}
