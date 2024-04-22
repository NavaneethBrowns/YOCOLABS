import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  show: boolean = false;
  loginForm: any;
  hasError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
    });
  }

  onLogin() {
    this.show = false;
    this.auth.login(this.loginForm.value).subscribe({
      next:(res:any)=>{
        if(res) {
          sessionStorage.setItem('accessToken',res.accessToken);
          sessionStorage.setItem('role',res.role);
          this.router.navigate(['/items']);
        }
      },
      error:()=>{

      }
    })
  }

  showPassword() {
    this.show = !this.show;
  }
}
