import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AgePipe } from 'src/app/pipe/age.pipe';
import { GlobalSelectionService } from 'src/app/services/global-selection.service';
import { SharedService } from 'src/app/services/shared.service';
import { countryData } from 'src/data';


import Swal from 'sweetalert2';
import { UserCardComponent } from '../user-card/user-card.component';
import { ChartModule } from 'primeng/chart';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  @ViewChild(UserCardComponent)
  private userCardComponent!: UserCardComponent;

  public userForm!: FormGroup;
  public name!: AbstractControl;
  public email!: AbstractControl;
  public dob!: AbstractControl;
  public avatar!: AbstractControl;
  public address!: AbstractControl;
  public country!: AbstractControl;

  userList: any[] = [];
  countriesList: any[] = [];
  submitted: boolean = false;
  isEdit: boolean = false;
  user: any = {};
  basicData:any = {
    labels: [],
    datasets: [
        {
            label: 'Users per Country',
            backgroundColor: '#42A5F5',
            data: []
        }
    ]
  };
  constructor(
    private fb: FormBuilder,
    private age: AgePipe,
    public GLOBAL: GlobalSelectionService,
    public SS: SharedService,
    public http: HttpClient
  ) {
    this.initForm();
  }

  initForm(close: boolean = false) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      dob: ['', [Validators.required]],
      avatar: [File, [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      country: ['', [Validators.required]],
    });

    this.submitted = false;
    this.isEdit = false;
    this.user = {};

    this.name = this.userForm.controls['name'];
    this.email = this.userForm.controls['email'];
    this.dob = this.userForm.controls['dob'];
    this.avatar = this.userForm.controls['avatar'];
    this.address = this.userForm.controls['address'];
    this.country = this.userForm.controls['country'];

    if (close) {
      $('#addEditUser').modal('hide');
      this.getUserList();
      this.getGraph();
    }
  }

  ngOnInit(): void {
    this.getUserList();
    this.getGraph();
    this.countriesList = Object.values(countryData);
  }

  getUserList() {
    this.http.get<any[]>(this.GLOBAL.baseUrl + 'user/list').subscribe(
      (data: any) => {
        this.userList = data.data;
      },
      (error: HttpErrorResponse) => {
        console.log('error', error);
        this.SS.handleError(error);
      }
    ); 
  }

  get f() {
    return this.userForm.controls;
  }

  getGraph() {
    this.http.get<any[]>(this.GLOBAL.baseUrl + 'user/graph').subscribe(
      (data: any) => {
        this.basicData.labels = []
        this.basicData.datasets[0].data = []
        data.data.forEach((element: any) => {
          this.basicData.labels.push(element._id)
          this.basicData.datasets[0].data.push(element.count)
        });
      },
      (error: HttpErrorResponse) => {
        console.log('error', error);
        this.SS.handleError(error);
      }
    );
  }

  editUser(user: any) {
    console.log('user----', user)
    this.isEdit = true;
    this.user = user;
    this.name.setValue(user.name);
    this.email.setValue(user.email);
    this.dob.setValue(user.dob);
    // this.avatar.setValue(user.avatar);
    this.address.setValue(user.address);
    this.country.setValue(user.country);
  }

  addUser() {
    // $('#addEditUser').modal('show');
  }

  submitUserDetails() {
    this.submitted = true;

    console.log('this.userForm.value', this.userForm.value);
    const formData = new FormData();
    formData.append('name', this.name.value);
    formData.append('email', this.email.value);
    formData.append('dob', this.dob.value);
    formData.append('avatar', this.avatar.value);
    formData.append('address', this.address.value);
    formData.append('country', this.country.value);

    if (this.userForm.valid) {
      if (this.isEdit) {
        
        this.http
          .patch<any[]>(
            this.GLOBAL.baseUrl + 'user/' + this.user._id,
            formData
          )
          .subscribe(
            (data: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Success',
              });
              this.initForm(true);
            },
            (error: HttpErrorResponse) => {
              console.log('error', error);
              Swal.fire({
                icon: 'error',
                title: error.error.message,
                showConfirmButton: false,
              });
            }
          );
      } else {
        this.http
          .post<any[]>(this.GLOBAL.baseUrl + 'user', formData)
          .subscribe(
            (data: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Success',
              });
              this.initForm(true);
            },
            (error: HttpErrorResponse) => {
              console.log('error', error);
              Swal.fire({
                icon: 'error',
                title: error.error.message,
                showConfirmButton: false,
              });
            }
          );
      }
      return;
    }
    return;
  }

  uploadProfile(event: any) {
    console.log(event.target.files[0]);
    
    this.avatar.setValue(event.target.files[0])
  }
}
