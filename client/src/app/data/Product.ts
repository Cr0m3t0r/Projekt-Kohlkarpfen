import {Tag} from "./Tag";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  tags: Tag[];
  image: string;
  seller: string;

}
