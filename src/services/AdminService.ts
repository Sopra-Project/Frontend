import { FetchHelper } from "../utils/FetchHelper";
import { API_URL } from "../utils/SystemVars";

export type IAdminService = {
    getAllUsers: () => Promise<any[]>;
    createUser: (user: { roleId: number; name: string; email: string }) => Promise<any>;
    updateUser: (userId: number, user: { roleId: number; name: string; email: string }) => Promise<any>;
    deleteUser: (userId: number) => Promise<any>;
    getAllBuildings: () => Promise<any[]>;
    createBuilding: (building: { name: string; totalparkingspots: number }) => Promise<any>;
    updateBuilding: (buildingId: string, building: { name: string; totalparkingspots: number }) => Promise<any>;
    deleteBuilding: (buildingId: number) => Promise<any>;
}

const URL = API_URL;

const AdminService: IAdminService = {
    getAllUsers: async () => {
        const response = await FetchHelper.get(URL + "/api/user/all");
        return response.json();
    },
    createUser: async (user) => {
        return await FetchHelper.post(URL + "/api/user", user);
    },
    updateUser: async (userId, user) => {
        return await FetchHelper.put(URL + `/api/user/${userId}`, user);
    },
    deleteUser: async (userId) => {
        return await FetchHelper.delete(URL + `/api/user/${userId}`);
    },
    getAllBuildings: async () => {
        const response = await FetchHelper.get(URL + "/api/admin/buildings");
        return response.json();
    },
    createBuilding: async (building) => {
        return await FetchHelper.post(URL + "/api/admin/building", building);
    },
    updateBuilding: async (buildingId, building) => {
        const id = parseInt(buildingId);
        return await FetchHelper.put(URL + `/api/admin/building/${id}`, building);
    },
    deleteBuilding: async (buildingId) => {
        return await FetchHelper.delete(URL + `/api/admin/building/${buildingId}`);
    }
};

export default AdminService;


