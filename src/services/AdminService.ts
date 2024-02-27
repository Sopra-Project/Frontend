import {FetchHelper} from "../utils/FetchHelper";
import {User} from "../types/types";

export type IAdminService = {
    getAllUsers: () => Promise<User[]>;
}

const AdminService: IAdminService = {
    getAllUsers: async () => {
        const response = await FetchHelper.get("http://localhost:8080/api/user/all")
        return response.json();
    }
}

export default AdminService;