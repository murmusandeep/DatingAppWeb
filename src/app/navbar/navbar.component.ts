import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/_model/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User | null> = of(null);

  constructor(
    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => this.router.navigateByUrl('/members'),
      error: (error) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error,
        }),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
