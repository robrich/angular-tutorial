import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public invalidLogin: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.clearUser();
  }

  login(formValues) {
    this.authService.login(formValues.email, formValues.password)
      .subscribe(result => {
        if (!this.authService.isAuthenticated) {
          this.invalidLogin = true;
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
