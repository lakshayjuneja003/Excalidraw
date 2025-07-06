import { Router , Router as ExpressRouter } from "express";
import { SignInHandler, SignupHandler, UserProfile } from "../controllers/user.controller";
import { userMiddleware } from "../middleware/user.middleware";
//@ts-ignore
const router : ExpressRouter = Router();

router.post("/signup", SignupHandler )
router.post("/login",SignInHandler)

router.get("/profile",userMiddleware, UserProfile)

export default router;
