import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
    console.log('Hello Home');
  }

}