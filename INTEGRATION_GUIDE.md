# Booking Page Integration with Laravel 10 Backend

## Overview
The BookingPage component has been updated to integrate with your Laravel 10 BookingController. The form now supports multiple AC types per service with quantities, aligning with your database structure.

## Key Changes Made

### 1. Updated API Client (`src/Api/api.tsx`)
- Added comprehensive API functions for all booking operations
- Includes proper TypeScript interfaces
- Configured axios with interceptors for error handling
- Supports all endpoints from your Laravel BookingController

### 2. Updated BookingPage Component (`src/Pages/BookingPage.tsx`)
- **New Data Structure**: Services now support multiple AC types with quantities
- **Time Selection**: Added time picker for appointments
- **Enhanced Validation**: Form validates AC types and quantities
- **API Integration**: Form submission now calls your Laravel API
- **Loading States**: Shows loading spinner during submission
- **Error Handling**: Displays API errors to users

### 3. Form Structure Changes
**Before:**
```tsx
{
  name, email, phone, address,
  services: [{ type, acType, date }]
}
```

**After:**
```tsx
{
  name, email, phone, address,
  services: [{
    type, date, time,
    acTypes: [{ type, quantity }]
  }]
}
```

## Laravel Backend Setup

### 1. Add Routes
Add the routes from `laravel-routes.txt` to your `routes/api.php` file.

### 2. CORS Configuration
Make sure your Laravel backend allows CORS for your React frontend:

```php
// In config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000', 'http://localhost:5173'], // Add your React dev server URL
```

### 3. API Endpoint Configuration
Update the `BASE_URL` in `src/Api/api.tsx` to match your Laravel server:
```tsx
const BASE_URL = 'http://localhost:8000/api'; // Change to your Laravel URL
```

## Data Flow

### 1. Form Submission Process
1. User fills out the booking form
2. Frontend validates data locally
3. Data is transformed to match Laravel API format:
   ```json
   {
     "name": "John Doe",
     "phone": "123-456-7890",
     "email": "john@example.com",
     "completeAddress": "123 Main St",
     "services": [
       {
         "type": "Cleaning",
         "date": "2025-01-15",
         "time": "09:00",
         "acTypes": [
           { "type": "Split", "quantity": 2 },
           { "type": "Window", "quantity": 1 }
         ]
       }
     ]
   }
   ```
4. API call is made to `POST /api/bookings`
5. Laravel processes and stores the booking
6. Success/error response is shown to user

### 2. Available Features
- **Date Availability**: Can check which dates are available
- **Multiple Services**: User can add multiple services per booking
- **Multiple AC Types**: Each service can have multiple AC types with quantities
- **Real-time Validation**: Form validates before submission
- **Error Feedback**: Shows specific error messages from Laravel

## Testing the Integration

### 1. Start Your Laravel Server
```bash
php artisan serve
```

### 2. Start Your React Development Server
```bash
npm run dev
```

### 3. Test the Booking Form
1. Navigate to the booking page
2. Fill out the customer information
3. Add services with AC types and quantities
4. Submit the form
5. Check your Laravel logs and database for the booking data

## Database Structure Expected
Based on your controller, the system expects these tables:
- `customers` (name, phone, email, complete_address)
- `bookings` (customer_id, status_id)
- `booking_services` (booking_id, service_type, appointment_date, appointment_time)
- `booking_actypes` (booking_service_id, ac_type_id, quantity)
- `ac_types` (type_name)
- `booking_statuses` (status_name)

## Error Handling
The frontend now handles various error scenarios:
- Network errors
- Validation errors from Laravel
- Date availability conflicts
- Server errors (500, etc.)

All errors are displayed to users via toast notifications.

## Future Enhancements
- Real-time date availability checking
- Service price calculation
- Booking confirmation emails
- Calendar integration
- Customer booking history
