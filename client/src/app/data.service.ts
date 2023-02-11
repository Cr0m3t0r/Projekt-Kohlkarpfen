import { Injectable } from '@angular/core';
import {Product} from "./Product";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public Products: Product[] = [];

  constructor(public http: HttpClient) {
    this.getProducts();
  }

  async getProducts(): Promise<void> {

  }


}
