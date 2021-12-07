import express from 'express';
import { helper } from '../helper/helper.resetPassword.js'

const router = express.Router();

//token generation and mail send
router
 .route("/")
 .post(helper.sendToken);


//verifying token with get method
router
 .route("/:userid/:token")
 .get(helper.verifyToken);

//verifying token and reset password
router
 .route("/:userid/:token")
 .post(helper.verifyAndUpdatePassword);

export const resetRoute = router;