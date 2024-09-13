import { CreateUserPayload } from "@/types";
import axios from "axios";

const baseUrl = 'http://localhost:4000';

export const userService = {
    create: async (payload: CreateUserPayload) => {
        const res = await axios.post(`${baseUrl}/users`, payload);
        return res.data;
    },
    getCommission: async (address: string) => {
        const res = await axios.get(`${baseUrl}/users/commission/${address}`);
        return res.data;
    }
}