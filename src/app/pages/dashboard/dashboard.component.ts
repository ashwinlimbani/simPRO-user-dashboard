import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/shared/services/users.service';
import { finalize, map, take } from 'rxjs';
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
export class DashboardComponent {
  private usersService = inject(UsersService);
  loadingUserCount = true;
  loadingUserCities = true;

  userCount$ = this.usersService.users$.pipe(
    take(1),
    map((users) => users.length),
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
    finalize(() => (this.loadingUserCities = false))
  );
}
