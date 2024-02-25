import {FetchHelper} from '../utils/FetchHelper';


const BASE_URL = 'http://localhost:8080'
const ALL_PARKING_API_URL = BASE_URL + '/api/parking/all';

export type IParkingService = {

    getAllParking: () => Promise<any>;
    getAllParkingsThisMonth: () => Promise<any>;
}

const ParkingService: IParkingService = {
    getAllParking: async () => {
        try {
            const response = await FetchHelper.get(ALL_PARKING_API_URL);
            return response.json();
        } catch (error) {
            console.error("error", error);
        }
    },

    getAllParkingsThisMonth: async () => {
        try {
            const response = await FetchHelper.get(ALL_PARKING_THIS_MONTH_API_URL);
            return response.json();
        } catch (error) {
            console.error("error", error);
        }
    }

};


export default ParkingService;
