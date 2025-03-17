import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, TokenStorageService, ValidatorService  } from '@shared/services';
import { TranslateModule } from '@ngx-translate/core';
import { IdentityUser } from '@shared/models';
import { ButtonComponent, PasswordComponent } from '@shared/components';
import { EmailComponent } from "../../../shared/components/form/email/email.component";

@Component({
    selector: 'app-login',
    imports: [
    EmailComponent,
    PasswordComponent,
    ButtonComponent,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatCheckboxModule
],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  validatorService = inject(ValidatorService);
  tokenStorageService = inject(TokenStorageService);
  authService = inject(AuthService);

  loginForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    if(this.authService.getCurrentUser()){
      this.router.navigate(['/']);
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let {email, password} = this.loginForm.value;

    this.authService.login(email, password)
    .subscribe((data) => {
      this.successfulLogin(data.token, data.user);
    });
  }

  successfulLogin(token: string, identityUser: any){
    const user: IdentityUser = {
      id: identityUser.id,
      username: identityUser.username,
      email: this.loginForm.value.email,
      roles: identityUser.roles
    };

    this.tokenStorageService.saveToken(token);
    this.tokenStorageService.saveUser(user);

    this.router.navigateByUrl('/');
  }

  getFieldError(field: string): string | null {
    return this.validatorService.formFielValidator(this.loginForm, field);
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.loginForm, field);
  }
}
