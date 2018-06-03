import { Component, OnInit, NgModule, Directive } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from '@app/_services/login.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  error = '';
  loading = false;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required ],
      senha: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  isFieldInvalid(field: string) {
    return (
      (this.form.get(field).invalid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginService.login(this.form.value).pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          exception => {
              this.error = exception.error.messages;
              this.loading = false;
          });
    }
     this.formSubmitAttempt = true;
  }

}
