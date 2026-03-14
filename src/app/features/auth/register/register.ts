import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TextBoxModule, ButtonModule, ToastModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  @ViewChild('toastObj') public toastObj!: ToastComponent;

  public position = { X: 'Right', Y: 'Top' };
  private fb = inject(FormBuilder);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      // Logic call API here
      // Mock Success Response
      const response = { success: true, message: 'Tạo tài khoản thành công! Xin hãy đăng nhập.' };

      this.toastObj.show({
        title: 'Success',
        content: response.message,
        cssClass: 'e-toast-success',
        icon: 'e-success toast-icons'
      });

      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);

    } else {
      // Mock Error Response
      const response = { success: false, message: 'Vui lòng điền đầy đủ và đúng định dạng các trường.' };
      this.toastObj.show({
        title: 'Lỗi',
        content: response.message,
        cssClass: 'e-toast-danger',
        icon: 'e-error toast-icons'
      });
    }
  }
}
