import { CreateUserPayload } from "@/types";
import axios from "axios";

const baseUrl = process.env.NODE_ENV === 'development' ? process.env.NEXT_APP_LOCAL_API : process.env.NEXT_APP_DOMAIN_API;

export const userService = {
    create: async (payload: CreateUserPayload) => {
        const res = await axios.post(`${baseUrl}/users`, payload);
        return res.data;
    }
}