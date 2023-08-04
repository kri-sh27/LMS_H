const errorMiddleware=(error,req,res,next)=>{
    req.statusCode=req.statusCode||500;
    req.message=req.message||"something went wrong";
    return res.status(res.statusCode).json({
        success:false,
        message:req.message,
        stack:error.stack
    });
}

// module.exports = errorMiddleware;
export default errorMiddleware;