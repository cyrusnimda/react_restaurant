import { RestaurantApi } from './api_restaurant';

// get user from api using token, if token is expired, redirect to login
export const getAll = async () => {
    return await RestaurantApi.get(`/restaurants`);
};

export const getById = async (id: number) => {
    return await RestaurantApi.get(`/restaurants/${id}`);
}

export const getTodayBookings = async () => {
    const date = new Date().toISOString().split("T")[0];
    return getBookingsByDate(date);
}

export const getBookingsByDate = async (date: string) => {
    return await RestaurantApi.get(`/bookings?date=${date}`);
}

export const getAllTables = async () => {
    return await RestaurantApi.get(`/tables`);
}

export const createBooking = async (params: { datetime: string, people: number, name: string }) => {
    return await RestaurantApi.post(`/bookings`, params);
}

/**
 * 
 *[
  {
    "booked_at": "2025-09-28T21:00:00",
    "created_at": "2025-09-28T09:39:17",
    "creator": {
      "name": "Josu Ruiz"
    },
    "id": 4,
    "name": "John Doe",
    "persons": 4,
    "tables": [
      {
        "desc": "Central table",
        "id": 2,
        "seats": 4
      }
    ]
  }
]
*/
export const isTableBooking = (bookings: any[], hour: string, tableId: number) => {
    for (const booking of bookings) {
        const bookingHour = booking.booked_at.split("T")[1].substring(0, 5);
        if (bookingHour === hour) {
            for (const table of booking.tables) {
                if (table.id === tableId) {
                    return booking;
                }
            }
        }
    }
    return false;
}

export const BOOKING_HOURS = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00'
]