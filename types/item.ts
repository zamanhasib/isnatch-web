export type Item = {
    _id: string;
    name: string;
    cashback: string;
    subItems: SubItem[];
}

export type SubItem = {
    code: string;
    name: string;
    price: number;
    description: string;
}