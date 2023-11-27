import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IdentificationService } from '../../../services/identificaton/identification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  privatecode: string = '';
  password: string = '';
  authenticationError: boolean = false;

  constructor(
    private identificationService: IdentificationService,
    private router: Router,
    private cookieService: CookieService
    ) {}

  ngOnInit(): void {
    this.authenticationError = false;
  }

  onSubmit() {
    this.identificationService.loginattempt(this.privatecode, this.password)
      .subscribe((response) => {
        if (response.success) {
          this.cookieService.set('userId', response.value);
          this.router.navigate(['homePage']);
        }
        else {
          this.authenticationError = true;
          console.error(response.message);
        }
      });
  }
}
