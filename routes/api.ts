import { Router } from "express";
import chatRoutes from "./api/chat.routes";
import userRoutes from "./api/user.routes";

const apiRouters = Router();
apiRouters.use( '/user', userRoutes);
apiRouters.use( '/chat', chatRoutes);


export default apiRouters;
