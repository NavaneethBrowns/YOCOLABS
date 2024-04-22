import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  show: boolean = false;
  signupForm: any;
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
    this.signupForm = this.fb.group({
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
      role: [
        'user',
        Validators.required
      ]
    });
  }
  
  onSignup() {
    this.show = false;
    this.auth.signup(this.signupForm.value).subscribe({
      next:(res:any)=>{
        if(res) {
          this.router.navigate(['/login']);
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
