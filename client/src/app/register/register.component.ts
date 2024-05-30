import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { AbstractControl, FormBuilder, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup = new FormGroup({});

  constructor(public accountService: AccountService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      nickname: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      dateOfBirth: ['', [Validators.required, this.maxDate(this.getDate18YearsBefore())]],
      country: [''],
      city: [''],
      introduction: [''],
      lookingFor: [''],
      interests: [''],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    };
  }

  maxDate(date: string): ValidatorFn {
    return (control: AbstractControl) => {
      let date1 = new Date(control.value);
      let date2 = new Date(date);
      return date1 <= date2 ? null : { less18Years: true };
    };
  }

  register() {
    console.log(this.registerForm?.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  getDate18YearsBefore(): string {
    let now = new Date();
    let year = now.getUTCFullYear() - 18;
    let month = now.getUTCMonth() + 1;
    let day = now.getUTCDate();
    return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
  }
}
