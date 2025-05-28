import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../../shared/dto/login/login-request.interface';
import { UserService } from '../../../shared/http/user.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { StorageService } from '../../../shared/services/storage.service';
import { LoginResponse } from '../../../shared/dto/login/login-response.interface';
import { GeneralConstant } from '../../../shared/general-constant';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ImageModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  protected loginForm: FormGroup;
  protected isLoading: boolean = false;
  protected btnSubmit: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  enviarFormulario() {
    this.isLoading = true;
    this.btnSubmit = true;

    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value as LoginRequest;
      
      this.authenticateUser(loginRequest);
    }
  }

  authenticateUser(loginRequest: LoginRequest) {
    this.userService.authenticateUser(loginRequest).subscribe({
      next: (data) => {
        this.saveUserToken(data.token);
        this.saveUserData(data);
      },
      error: (error) => {
        this.isLoading = false;
        this.btnSubmit = false;
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
        this.btnSubmit = false;
        
        this.router.navigate(['/home']);
      }
    });
  }

  saveUserToken(token: string){
    this.authService.setToken(token);
  }

  saveUserData(loginResponse: LoginResponse){
    this.storageService.setItem(GeneralConstant.USER_DATA_KEY, loginResponse)
  }
}
