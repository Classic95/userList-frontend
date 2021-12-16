import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  submitted: boolean = false
  
  constructor(
    private fb: FormBuilder,
    public SS: SharedService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required,]],//Validators.minLength(6)
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {}
  
  onSubmit() {
    this.submitted = true
    console.log('valid--', this.loginForm.valid)
    if (this.loginForm.valid) {
      this.SS.redirect('app/dashboard')
      return
    }
    return
  }
}
