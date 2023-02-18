import {Router} from 'express';
const userRoutes = Router();

import {
    userRegistration,
    userLogin,
    searchUser
} from '../../controllers/user.controller'



userRoutes.post('/registration', userRegistration);
userRoutes.post('/login', userLogin);
userRoutes.get('/find', searchUser);


export default userRoutes;

