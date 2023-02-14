import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Product} from "../data/Product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public product: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
