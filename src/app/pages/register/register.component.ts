import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  password = '';
  successMsg = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.successMsg = 'Registered! Please login.';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => { this.errorMsg = 'Registration failed'; }
    });
  }
}