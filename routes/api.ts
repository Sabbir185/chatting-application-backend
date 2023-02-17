import { Router } from "express";
import userRoutes from "./api/user.routes";

const apiRouters = Router();
apiRouters.use( '/user', userRoutes);


export default apiRouters;
