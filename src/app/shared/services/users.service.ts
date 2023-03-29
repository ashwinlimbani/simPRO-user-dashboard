import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  defer,
  filter,
  first,
  isObservable,
  map,
  mergeMap,
  Observable,
  of,
  shareReplay,
} from 'rxjs';
import { User } from '../../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // private usersSubject: BehaviorSubject<Array<User>> = new BehaviorSubject<
  //   Array<User>
  // >([]);
  // users$ = this.usersSubject.asObservable().pipe(
  //   filter((users) => !!users.length),
  //   map((users) => {
  //     return [...users];
  //   })
  // );

  users$!: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  // loadUsers() {
  //   return this.http
  //     .get<{
  //       limit: number;
  //       skip: number;
  //       total: number;
  //       users: User[];
  //     }>(`https://dummyjson.com/users`)
  //     .pipe(map((response) => response.users))
  //     .subscribe((users) => {
  //       this.usersSubject.next(users);
  //     });
  // }

  loadUsers() {
    const userAPICall$ = this.http
      .get<{
        limit: number;
        skip: number;
        total: number;
        users: User[];
      }>(`https://dummyjson.com/users`)
      .pipe(map((response) => response.users));
    this.users$ = renewAfterTimer(userAPICall$, 5 * 60 * 1000, 1);
  }
}

const createReturnObs = (
  obs: Observable<any>,
  time: number,
  bufferReplays: number
) => obs.pipe(shareReplay(bufferReplays, time));

export function renewAfterTimer(
  obs: Observable<any>,
  time: number,
  bufferReplays: number = 1
) {
  return createReturnObs(obs, time, bufferReplays).pipe(
    first(
      null,
      defer(() => createReturnObs(obs, time, bufferReplays))
    ),
    mergeMap((d) => (isObservable(d) ? d : of(d)))
  );
}
