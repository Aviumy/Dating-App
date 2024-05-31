import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { AbstractControl, FormBuilder, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] = [];

  constructor(public accountService: AccountService,
    private fb: FormBuilder,
    private router: Router) { }

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
    this.accountService.register(this.registerForm.value).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
      },
      error: error => {
        if (error.error.errors) {
          this.validationErrors = [];
          for (const key in error.error.errors) {
            if (error.error.errors[key]) {
              for (const err of error.error.errors[key]) {
                this.validationErrors.push(err);
              }
            }
          }
        }
      },
    });
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
