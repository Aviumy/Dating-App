import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error-500',
  templateUrl: './server-error-500.component.html',
  styleUrls: ['./server-error-500.component.css']
})
export class ServerError500Component {
  error: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }
}
