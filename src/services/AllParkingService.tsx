import {FetchHelper} from '../utils/FetchHelper';


const BASE_URL = 'http://localhost:8080'
const ALL_PARKING_API_URL = BASE_URL + '/api/parking/all';

export default async function AllParkingService() {

    return FetchHelper.get(ALL_PARKING_API_URL).then((response) => {
        return response.json();
    }).catch((error) => {
        console.log("error", error)
    });

}
