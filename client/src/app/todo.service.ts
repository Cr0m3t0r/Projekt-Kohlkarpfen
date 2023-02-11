import { Injectable } from '@angular/core';
import {ToDoEntry} from "./ToDoEntry";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoList: ToDoEntry[] = [];

  constructor(public http: HttpClient) {
    this.fetchTodos();
  }

  async fetchTodos(): Promise<void> {
    const data: any = await lastValueFrom(this.http.get("http://localhost:8080/todolist"));
    this.todoList = data.todoList;
  }

  async addTodo(title: string): Promise<void> {
    await lastValueFrom(this.http.post("http://localhost:8080/entry", {
      title
    }));
    await this.fetchTodos();
  }

  async deleteTodo(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(`http://localhost:8080/entry/${id}`));
    await this.fetchTodos();
  }

  async markDone(id: number): Promise<void> {
    await lastValueFrom(this.http.put(`http://localhost:8080/done/${id}`, {}));
    await this.fetchTodos();
  }

  async markUndone(id: number): Promise<void> {
    await lastValueFrom(this.http.put(`http://localhost:8080/undone/${id}`, {}));
    await this.fetchTodos();
  }
}
