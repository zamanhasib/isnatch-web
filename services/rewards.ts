import { Payment } from "types/payment";
import { getObjectById, getObjects, saveObject } from "./common";


export async function getCategories(){
    return await getObjects("categories");
};

export async function getCategory(categoryId: string){
    return await getObjectById(categoryId, "categories");
};

export async function getItem(itemId: string){
    return await getObjectById(itemId, "items");
};

export async function getCustomer(itemId: string){
    return await getObjectById(itemId, "customers");
};

export async function savePayment(object: Payment) {
    return await saveObject(object, "sales");
}
