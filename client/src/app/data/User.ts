import {Product} from "./Product";
import {Chat} from "./Chat";

export interface User {

  email: string;
  firstName: string;
  lastName: string;
  password: string;
  chatList: Chat[];
  shoppingCart: Product[];

}
