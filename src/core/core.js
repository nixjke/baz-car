import { API_CONFIG } from "@/utils/constants";
import axiosInstance from "@/utils/axios";

async function fetchBookings(carName = null) {
    try {
        const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.BOOKINGS, {
            params: carName ? { carName } : undefined
        });

        if (response.data.status === 'error') {
            console.error('Error loading data:', response.data.message);
            return [];
        }

        return response.data.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
}

export { fetchBookings };