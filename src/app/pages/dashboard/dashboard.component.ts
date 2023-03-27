import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/shared/services/users.service';
import { map, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private usersService = inject(UsersService);
  userCount$ = this.usersService.users$.pipe(map((users) => users.length));
  userCities$ = this.usersService.users$.pipe(
    map((users) => {
      let cities = users.map((u) => u.address.city);
      cities = [...new Set(cities)];
      return cities.sort();
    }),
    tap((cities) => console.log(cities))
  );
}
