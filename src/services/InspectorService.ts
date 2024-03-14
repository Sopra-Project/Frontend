import {API_URL} from "../utils/SystemVars";

type InspectorService = {
    isParkingValid: (registrationNumber: string) => Promise<any>;
}

const API = API_URL + '/api/inspector';

const InspectorService: InspectorService = {
    isParkingValid: async (registrationNumber: string) => {
        return await fetch(API + '/validate/car/' + registrationNumber, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response.json();
        });
    }
}

export default InspectorService;