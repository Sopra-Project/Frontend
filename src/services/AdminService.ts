import {FetchHelper} from "../utils/FetchHelper";
import {User} from "../types/types";
import {API_URL} from "../utils/SystemVars";

export type IAdminService = {
    getAllUsers: () => Promise<User[]>;
    createUser: (user: { roleId: number; name: string; email: string }) => Promise<any>;
}

const URL = API_URL;

const AdminService: IAdminService = {
    getAllUsers: async () => {
        const response = await FetchHelper.get(URL + "/api/user/all")
        return response.json();
    },
    createUser: async (user: any) => {
        return await FetchHelper.post(URL + "/api/user", user);
    }
}

export default AdminService;