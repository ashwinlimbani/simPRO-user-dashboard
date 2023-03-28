import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { User } from 'src/app/interface/user';
import { AvoidKeysPipe } from 'src/app/shared/pipes/avoid-keys.pipe';
import {
  BreakpointObserver,
  BreakpointState,
  LayoutModule,
} from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { delay, map, switchMap, take } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    AvoidKeysPipe,
    LayoutModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  private breakpointObserver = inject(BreakpointObserver);
  private route = inject(ActivatedRoute);

  columnsToDisplay = [
    'firstName',
    'lastName',
    'username',
    'email',
    'gender',
    'city',
  ];
  propertiesUsed = [...this.columnsToDisplay, 'image'];
  expandedElement: User | null = null;
  mobileView = false;
  loadingUsers = true;

  users$ = this.route.params.pipe(
    take(1),
    switchMap((params) => {
      return this.usersService.users$.pipe(
        delay(1),
        map((users) => {
          this.loadingUsers = false;
          if (params['city']) {
            return users.filter((user) => user.address.city == params['city']);
          }

          return users;
        })
      );
    })
  );

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 650px)'])
      .subscribe((state: BreakpointState) => {
        this.mobileView = !state.matches;
      });
  }
}
