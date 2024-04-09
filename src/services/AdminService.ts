import { FetchHelper } from "../utils/FetchHelper";
import { User } from "../types/types";
import { API_URL } from "../utils/SystemVars";

export type IAdminService = {
    getAllUsers: () => Promise<User[]>;
    createUser: (user: { roleId: number; name: string; email: string }) => Promise<any>;
    updateUser: (userId: number, user: { roleId: number; name: string; email: string }) => Promise<any>;
    deleteUser: (userId: number) => Promise<any>;
}

const URL = API_URL;

const AdminService: IAdminService = {
    getAllUsers: async () => {
        const response = await FetchHelper.get(URL + "/api/user/all");
        return response.json();
    },
    createUser: async (user: any) => {
        return await FetchHelper.post(URL + "/api/user", user);
    },
    updateUser: async (userId: number, user: any) => {
        return await FetchHelper.put(URL + `/api/user/${userId}`, user);
    },
    deleteUser: async (userId: number) => {
        return await FetchHelper.delete(URL + `/api/user/${userId}`);
    }
};

export default AdminService;
