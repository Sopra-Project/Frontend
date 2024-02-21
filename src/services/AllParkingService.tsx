import axios from 'axios';

const ALL_PARKING_API_URL = 'https://gjesteparkering-faa7b9adf6e4.herokuapp.com/api/parking/all';

export default async function AllParkingService() {
    try {
        const response = await axios.get(ALL_PARKING_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching parking data:', error);
        throw error; 
    }
}