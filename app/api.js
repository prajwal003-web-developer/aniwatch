import axios from "axios";


export const api = axios.create({
    baseURL:"https://animeapi-nu-flax.vercel.app/api"
})