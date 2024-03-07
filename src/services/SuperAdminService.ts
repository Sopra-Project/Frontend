import {Building} from "../types/types";
import {FetchHelper} from "../utils/FetchHelper";

export type ISuperAdminService = {
    getAllBuildings: () => Promise<Building[]>
}
const BASE_URL = process.env.REACT_APP_API_URL;
const GET_ALL_BUILDINGS_URL = BASE_URL + "/api/superadmin/buildings";

const SuperAdminService: ISuperAdminService = {
    getAllBuildings: async (): Promise<Building[]> => {
        return FetchHelper.get(GET_ALL_BUILDINGS_URL).then((response) => {
            return response.json();
        })
    },

}

export default SuperAdminService;