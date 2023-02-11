import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './list/list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";

const appRoutes: Routes = [
  { path: "", component: ListComponent },
  { path: "done", component: ListComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
