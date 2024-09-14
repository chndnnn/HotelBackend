import express from 'express';
import { getRooms ,updaterooms} from '../Controllers/roomsController.js';

let roomrouter = express.Router();
roomrouter.route('/getRooms').get(getRooms);
roomrouter.route('/updateFaclities').post(updaterooms);

export default roomrouter;