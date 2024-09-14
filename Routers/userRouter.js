import express from 'express'
import { authenticateUSer, regesterUser,userLogin } from '../Controllers/usersController.js';

let userRouter = express.Router();
userRouter.route('/regesterUser').post(regesterUser);
userRouter.route('/userLogin').post(userLogin);
userRouter.route('/getAuthenticate/:id').get(authenticateUSer);

export default userRouter