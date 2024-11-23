import  mongoose from "mongoose";


const loanRequestSchema = new mongoose.Schema({

    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    amount: {
        type:Number,
    
        required: true
    },
    duration: {
        type:Number,
    
        required: true
    },
    interestRate: {
        type:Number,
    
        required: true
    },
    status: {
        type:String,
        enum:['pending' ,'approved','rejected', 'disbursed'],
        default:'pending'
    
        
    },

},{timestamps:true});

export const LoanRequest = mongoose.model("LoanApplication", loanRequestSchema);