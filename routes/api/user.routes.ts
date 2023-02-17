import {Router} from 'express';
const userRoutes = Router();

import {
    userRegistration,
    userLogin,
} from '../../controllers/user.controller'



userRoutes.post('/registration', userRegistration);
userRoutes.post('/login', userLogin);


export default userRoutes;

