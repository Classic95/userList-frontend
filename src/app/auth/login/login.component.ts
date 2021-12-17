import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GlobalSelectionService } from 'src/app/services/global-selection.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    public GLOBAL: GlobalSelectionService,
    public SS: SharedService,
    public http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]], //Validators.minLength(6)
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    console.log('valid--', this.loginForm.valid);
    if (this.loginForm.valid) {
      this.http.post<any[]>(this.GLOBAL.baseUrl + 'auth/login', this.loginForm.value).subscribe(
        (data: any) => {
          if (data.status == 'error') {
            throw new Error('Invalid Login');            
          }
          this.SS.redirect('app/dashboard');
        },
        (error: HttpErrorResponse) => {
          console.log('error', error)
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false
          })
        }
      );
      return;
    }
    return;
  }
}
