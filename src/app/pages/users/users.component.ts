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

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, AvoidKeysPipe],
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

  ngOnInit(): void {
    this.usersService.users$.subscribe((users) => {
      console.log(users);
      console.log(Object.getOwnPropertyNames(users[0]));
      // Object.
      this.dataSource = users;
    });
  }
}
