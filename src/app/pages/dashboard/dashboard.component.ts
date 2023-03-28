import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/shared/services/users.service';
import { delay, finalize, map, take } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private usersService = inject(UsersService);
  loadingUserCount = true;
  loadingUserCities = true;
  breakpoint: number = 4;
  cityColspan: number = 3;

  userCount$ = this.usersService.users$.pipe(
    take(1),
    map((users) => users.length),
    delay(1),
    finalize(() => {
      this.loadingUserCount = false;
    })
  );
  userCities$ = this.usersService.users$.pipe(
    take(1),
    map((users) => {
      let cities = users.map((u) => u.address.city);
      cities = [...new Set(cities)];
      return cities.sort();
    }),
    delay(1),
    finalize(() => (this.loadingUserCities = false))
  );

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 650 ? 1 : 4;
    this.cityColspan = window.innerWidth <= 650 ? 1 : 3;
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 650 ? 1 : 4;
    this.cityColspan = event.target.innerWidth <= 650 ? 1 : 3;
  }
}
