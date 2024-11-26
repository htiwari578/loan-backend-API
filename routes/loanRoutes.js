import express from 'express';
import { approveLoanReq, createLoanRequest, getAllLoanRequests, getLoanHistory } from '../contollers/loanController.js';
import isAuth from '../middleware/isAuth.js'
import isAdmin from '../middleware/isAdmin.js';




const router = express.Router();


router.route('/request').post(isAuth , createLoanRequest);
router.route('/history').get(isAuth , getLoanHistory);

router.route('/loan-request').get(isAuth,isAdmin, getAllLoanRequests);
router.route('/loan-request/:id/approve').put(isAuth,isAdmin,approveLoanReq);

export default router;