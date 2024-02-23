import axios from 'axios';

const BASE_URL = 'http://localhost:8080'
const ALL_PARKING_API_URL = BASE_URL + '/api/parking/all';

export default async function AllParkingService() {

    try {
        const response = await axios.get(ALL_PARKING_API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching parking data:', error);
        throw error; 
    }
}