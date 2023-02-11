import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  public title: string = '';

  constructor(public activeModal: NgbActiveModal) {
  }

  save() {
    if (this.title.trim().length > 0) {
      this.activeModal.close(this.title);
    }
  }
}
