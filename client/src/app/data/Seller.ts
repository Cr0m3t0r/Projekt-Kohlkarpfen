import {Product} from "./Product";

export interface Seller {

  id: string;
  firstName: string;
  lastName: string;
  products: Product[];
}
