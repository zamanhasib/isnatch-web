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

