import {Injectable} from '@angular/core';
import {Message} from "./data/Message";
import {Product} from "./data/Product";
import {Seller} from "./data/Seller";
import {Tag} from "./data/Tag";
import {User} from "./data/User";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {SelectorListContext} from "@angular/compiler";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(public http: HttpClient) {


  }

  async createUser(firstName: string, lastName: string, email: string, password: string): Promise<void> {


    await lastValueFrom(this.http.post('http://localhost:8080/login/', {

      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      wishList: []
    }))
  }

  async readUser(email: string): Promise<any> {

    await lastValueFrom(this.http.get('http://localhost:8080/user/${email}'));


  }

  // Eventuell den gesamten User um alles neu zu updaten ? Put bedarf Tests
  // TODO herausfinden ob User Objekt oder sämtliche Parameter
  async updateUser(email: string): Promise<any> {

    await lastValueFrom(this.http.put(`http://localhost:8080/user/${email}`, {}));


  }


  async deleteUser(email: string): Promise<any> {

    await lastValueFrom(this.http.delete(`http://localhost:8080/user/${email}`));
    return
  }


  async createProduct(id: number, name: string, price: number, description: string, tags: Tag[], image: string, seller: Seller): Promise<any> {

    const data = await lastValueFrom(this.http.post(`http://localhost:8080/product/${id}`, {

      id: id,
      name: name,
      price: price,
      description: description,
      tags: tags,
      image: image,
      seller: seller

    }))
    // TODO muss beim erstellen eines Produktes ein update User durchgeführt werden damit diesem ein Produkt hinzugefügt wird ?

    // Beim Erstellen eines Produktes wird das Produkt der Produktliste hinzugefügt

    await lastValueFrom(this.http.post(`http://localhost:8080/productlist/`, {
      data: data
    }))
    await lastValueFrom(this.http.post(`http://localhost:8080/${seller.id}`,{
      data: data

    }))
  }

  async readProduct(id: number): Promise<any> {
    await lastValueFrom(this.http.get(`http://localhost:8080/product/${id}`));
  }

  async updateProduct(id: number): Promise<any> {

    await lastValueFrom(this.http.put(`http://localhost:8080/product/${id}`, {}));

  }

  async deleteProduct(id: number): Promise<any> {

    await lastValueFrom(this.http.delete(`http://localhost:8080/product/${id}`));
    await lastValueFrom(this.http.delete(`http://localhost:8080/productlist/${id}`));
  }

  async readProductList(): Promise<any> {
    await lastValueFrom(this.http.get('http://localhost:8080/productlist'));
  }


  async createMessage(id: number, message: string, senderMail: string, receiverMail: string, date: string): Promise<any> {

    const data = await lastValueFrom(this.http.post(`http://localhost:8080/message/${id}`, {
      id: id,
      message: message,
      senderMail: senderMail,
      receiverMail: receiverMail,
      date: date
    }));
    // Nach dem Erstellen der Nachricht wird diese in den Chat geschickt
    await lastValueFrom(this.http.post(`http://localhost:8080/chat/${id}`, {
      data: data
    }));


  }

  //read und delete message evtl nicht benötigt
  async readMessage(id: number): Promise<any> {
    await lastValueFrom(this.http.get(`http://localhost:8080/message/${id}`));
  }

  async deleteMessage(id: number): Promise<any> {
    await lastValueFrom(this.http.delete(`http://localhost:8080/message/${id}`));
  }

  async getChat(id:number): Promise<any> {
    await lastValueFrom(this.http.get(`http://localhost:8080/chat/${id}`));
  }
  async deleteChat(id:number): Promise<any> {
    await lastValueFrom(this.http.delete(`http://localhost:8080/chat/${id}`));
  }


}





