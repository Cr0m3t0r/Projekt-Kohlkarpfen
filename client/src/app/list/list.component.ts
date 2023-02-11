import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from "../todo.service";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  done = false;

  constructor(public todoService: TodoService, private router: Router) {
  }

  ngOnInit(): void {
    this.done = this.router.url === "/done"
  }
}
