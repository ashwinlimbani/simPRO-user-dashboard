import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private location = inject(Location);

  ngOnInit(): void {
    this.location.subscribe((value) => {
      console.log(value);
    });
  }

  goBack() {
    // console.log(this.location.);

    this.location.back();
  }
}
