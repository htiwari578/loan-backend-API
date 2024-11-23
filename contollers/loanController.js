import { LoanRequest } from "../model/LoanRequest.js";


// creating new loan request

export const createLoanRequest = async (req ,res) => {
    const {amount , duration ,  interestRate } = req.body;
    try {
        if(!amount || !duration || !interestRate){
            return res.status(400).json({
                message:"All fields are required",
                success: false
            });
        }

        const loanRequest = new LoanRequest({
            user: req.user.id,
            amount,
            duration,
            interestRate,
        })
        await loanRequest.save();

        return res.status(201).json({
            message:"loan request created successfully",
            success: true,
            loanRequest,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"error while loan request",
            success: false
        })
    }
} 

// get all loan request

export const getAllLoanRequests = async (req,res) => {
    try {
        const loanRequest = await LoanRequest.find().populate('user', 'name email');
            return res.status(200).json({
                success:true,
                loanRequest,
            });
    } catch (error) {
        console.log(error);
    }
}

// approve for loan requestt
export const approveLoanReq = async (req,res) => {
    try {
        // finding loan request by id
        const loanRequest = await LoanRequest.findById(rq.params.id);

        if(!loanRequest){
            return res.status(404).json({
                message:"Loan Request not found",
                success:false
            })
        }

        loanRequest.status='approved';
        await loanRequest.save();

        return res.status(200).json({
            message:"Loan resquest approved"
        });

    } catch (error) {
        console.log(error);
    }

}


// Loan History

export const getLoanHistory = async (req,res)=>{
    try {
        const loans = await LoanRequest.find({user: req.user.id});
    } catch (error) {
        console.log(error);
    }
}
