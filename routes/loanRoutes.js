import express from 'express';
import { approveLoanReq, createLoanRequest, getAllLoanRequests, getLoanHistory } from '../contollers/loanController';
import isAuth from '../middleware/isAuth';




const router = express.Router();


router.route('/request').post(isAuth , createLoanRequest);
router.route('/history').get(isAuth , getLoanHistory);

router.route('/loan-request').get(isAuth, getAllLoanRequests);
router.route('/loan-request/:id/approve').put(isAuth ,approveLoanReq);

export default router;