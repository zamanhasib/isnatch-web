import axios from "axios";
import url from "../config/url";
const apiURL =
  process.env.NODE_ENV === "production" ? url.PROD_API_URL : url.DEV_API_URL;

export async function getCategories(){
    try {
        const response = await axios.get(apiURL + "categories/");
        return response.data;
    } catch (error) {
        return [];
    }
};

export async function getCategory(categoryId: string){
    try {
        const response = await fetch(apiURL + "categories/" + categoryId);
        return response.json();
    } catch (error) {
        return {};
    }
};

export async function getItem(itemId: string){
    try {
        const response = await axios.get(apiURL + "items/" + itemId);
        return response.data;
    } catch (error) {
        return {};
    }
};
