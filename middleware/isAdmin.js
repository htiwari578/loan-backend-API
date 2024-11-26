const isAdmin = (req, res, next) => {
    try {
        if(req.user && req.user.role === 'admin'){
            next();
        }else {
            return res.status(403).json({
                message:"Access denied",
                success: false
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export default isAdmin;