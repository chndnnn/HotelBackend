import express from 'express'
import { createBooking , getBookingByUserEmail ,deleteBookings} from '../Controllers/bookingController.js';

const bookingrouter = express.Router();
bookingrouter.route('/enterBooking').post(createBooking);
bookingrouter.route('/getBooking').post(getBookingByUserEmail);
bookingrouter.route('/updateBooking').patch(deleteBookings);

export default bookingrouter ;
