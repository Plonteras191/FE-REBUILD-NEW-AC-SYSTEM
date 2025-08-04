
import axios from 'axios';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Base URL for Laravel API
const BASE_URL = 'http://localhost:8000/api'; // Update this to your Laravel API URL

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add any auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types for booking
export interface ACType {
  type: string;
}

export interface ServiceData {
  type: 'Cleaning' | 'Repair' | 'Installation' | 'Maintenance';
  date: string;
  acTypes: ACType[];
}

export interface BookingFormData {
  name: string;
  phone: string;
  email?: string;
  completeAddress: string;
  services: ServiceData[];
}

export interface BookingResponse {
  success: boolean;
  bookingId?: number;
  customerId?: number;
  message: string;
}

export interface DateAvailabilityResponse {
  dates: {
    [date: string]: {
      available: boolean;
      remaining_slots: number;
    };
  };
}

// Booking API functions
export const bookingAPI = {
  // Get available dates
  getAvailableDates: async (start?: string, end?: string): Promise<string[]> => {
    try {
      const params: any = {};
      if (start) params.start = start;
      if (end) params.end = end;
      
      const response = await api.get('/bookings/available-dates', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching available dates:', error);
      throw error;
    }
  },

  // Check date availability for specific dates
  checkDateAvailability: async (dates: string[]): Promise<DateAvailabilityResponse> => {
    try {
      const response = await api.post('/bookings/check-date-availability', { dates });
      return response.data;
    } catch (error) {
      console.error('Error checking date availability:', error);
      throw error;
    }
  },

  // Create a new booking
  createBooking: async (bookingData: BookingFormData): Promise<BookingResponse> => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get booking details
  getBooking: async (id: number) => {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  // Update booking status
  updateBookingStatus: async (id: number, status: string) => {
    try {
      const response = await api.patch(`/bookings/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (id: number, cancellationReason: string, cancelledBy?: number) => {
    try {
      const response = await api.patch(`/bookings/${id}/cancel`, {
        cancellation_reason: cancellationReason,
        cancelled_by: cancelledBy,
      });
      return response.data;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  },

  // Get all bookings with filters
  getBookings: async (filters?: {
    status?: string;
    include_cancelled?: boolean;
    start_date?: string;
    end_date?: string;
    customer_id?: number;
    page?: number;
  }) => {
    try {
      const response = await api.get('/bookings', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get bookings by date (for debugging)
  getBookingsByDate: async (date: string) => {
    try {
      const response = await api.get('/bookings/by-date', { params: { date } });
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings by date:', error);
      throw error;
    }
  },
};

export default api;