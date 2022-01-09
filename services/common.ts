import axios from "axios";
import url from "../config/url";
const apiURL =
  process.env.NODE_ENV === "production" ? url.PROD_API_URL : url.DEV_API_URL;

export async function getObjectById(itemId: string, controller: string){
    try {
        const response = await axios.get(apiURL + controller + "/" + itemId);
        return response.data;
    } catch (error) {
        return {};
    }
};

export async function getObjects(controller: string){
    try {
        const response = await axios.get(apiURL + controller + "/");
        return response.data;
    } catch (error) {
        return [];
    }
};

export async function saveObject(object: any, controller: string){
    try {
        const response = await axios.post(apiURL + controller + "/", object);
        console.log(response);
        return response.data;
    } catch (error) {
        return null;
    }
};