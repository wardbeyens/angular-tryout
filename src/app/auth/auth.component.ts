import { UserService } from './../shared/services/user.service';
import { Errors } from './../shared/models/errors.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  isSubmitting: boolean = false;
  authForm: FormGroup;

  errors: Errors = { errors: {} };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.authForm = this.fb.group({
      email: ['test@test.test', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((data) => {
      console.log(data);
      this.authType = data[data.length - 1].path;
      this.title = this.authType === 'login' ? 'Sign In' : 'Sign Up';

      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };
    let credentials = this.authForm.getRawValue();
    console.log(credentials);

    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (data) => this.router.navigateByUrl('/'),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
