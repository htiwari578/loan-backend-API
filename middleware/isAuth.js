import jwt from "jsonwebtoken"



const isAuth = async (req,res,next)  => {

    try {
        // retrive token from cookies 

        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        // checking token 
        if(!token) {
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            });
        }

        // verify the token and extract user data
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token"
            })
        };
        next();

    } catch (error) {
        console.log(error);
    }
}