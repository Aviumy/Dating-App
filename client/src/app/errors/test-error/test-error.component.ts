import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
    selector: 'app-test-error',
    templateUrl: './test-error.component.html',
    styleUrls: ['./test-error.component.css'],
    standalone: true
})
export class TestErrorComponent {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  get401Error() {
    this.http.get(this.baseUrl + "error/auth").subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
    });
  }

  get404Error() {
    this.http.get(this.baseUrl + "error/not-found").subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + "error/server-error").subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + "error/bad-request").subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
    });
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
    });
  }
}
