import axios from 'axios';

const ALL_PARKING_API_URL = 'http://localhost:8080/api/parking/all';

export default async function AllParkingService() {
    try {
        const response = await axios.get(ALL_PARKING_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching parking data:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}