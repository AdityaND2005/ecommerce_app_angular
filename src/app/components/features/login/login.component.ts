import { Component, EventEmitter, inject, Input, model, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    DividerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.authService.token.set(response.token);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged in successfully!' });
        setTimeout(() => {
          this.forceClose();
        }, 500);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid username or password.' });
      }
    });
  }

  closeDialog(isVisible: boolean) {
    this.visible = isVisible;
    this.visibleChange.emit(this.visible);
    if (!isVisible) {
      this.loginForm.reset();
    }
  }

  forceClose() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.loginForm.reset();
  }
}
