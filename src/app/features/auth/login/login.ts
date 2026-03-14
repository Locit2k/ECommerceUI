import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TextBoxModule, ButtonModule, ToastModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  @ViewChild('toastObj') public toastObj!: ToastComponent;

  public position = { X: 'Right', Y: 'Top' };
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login({ username, password }).subscribe({
        next: (response) => {
          if (response.success) {
            this.toastObj.show({
              title: 'Success',
              content: response.message || 'Đăng nhập thành công!',
              cssClass: 'e-toast-success',
              icon: 'e-success toast-icons'
            });

            this.router.navigate(['/products']);
          } else {
            this.toastObj.show({
              title: 'Lỗi',
              content: response.message || 'Đăng nhập thất bại',
              cssClass: 'e-toast-danger',
              icon: 'e-error toast-icons'
            });
          }
        },
        error: (error) => {
          this.toastObj.show({
            title: 'Lỗi',
            content: error.error?.message || 'Có lỗi xảy ra khi đăng nhập',
            cssClass: 'e-toast-danger',
            icon: 'e-error toast-icons'
          });
        }
      });
    } else {
      this.toastObj.show({
        title: 'Lỗi',
        content: 'Vui lòng điền đầy đủ thông tin!',
        cssClass: 'e-toast-danger',
        icon: 'e-error toast-icons'
      });
    }
  }
}
