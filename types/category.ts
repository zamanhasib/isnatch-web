import { Item } from "./item";

export type Category = {
  _id: string;
  code: string;
  name: string;
  sequence: string;
  items: any[];
}