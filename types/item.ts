export type Item = {
    _id: string;
    name: string;
    cashback: string;
    subItems: SubItem[];
    redeemAt: string;
    redeemBy: Date;
    instructions: string[];
}

export type SubItem = {
    code: string;
    name: string;
    price: number;
    description: string;
    count?: number;
    total?: number;
}

export type CartItem = {
    code: string;
    name: string;
    count: number;
    price: number;
    total: number;
}