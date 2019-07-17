import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-temporary',
  templateUrl: './temporary.component.html',
  styleUrls: ['./temporary.component.css']
})
export class TemporaryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['topics']);
  }

}
