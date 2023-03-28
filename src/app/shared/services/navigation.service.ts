import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private history: string[] = [];

  constructor(private router: Router, private location: Location) {}

  public startSaveHistory(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          !this.history.length ||
          event.urlAfterRedirects != this.history[this.history.length - 1]
        ) {
          this.history.push(event.urlAfterRedirects);
        }
      }
    });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public goBack(): void {
    if (this.history.length > 1) {
      this.history.pop();
      this.location.back();
    }
  }

  public getPreviousUrl(): string {
    if (this.history.length > 1) {
      return this.history[this.history.length - 2];
    }

    return '';
  }
}
