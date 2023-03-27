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

  dataSource: any;
  columnsToDisplay = [
    'firstName',
    'lastName',
    'username',
    'email',
    'gender',
    'birthDate',
  ];
  propertiesUsed = [...this.columnsToDisplay, 'image'];
  expandedElement: User | null = null;
  mobileView = false;

  ngOnInit(): void {
    this.usersService.users$.subscribe((users) => {
      this.dataSource = users;
    });

    this.breakpointObserver
      .observe(['(min-width: 650px)'])
      .subscribe((state: BreakpointState) => {
        this.mobileView = !state.matches;
      });
  }
}
