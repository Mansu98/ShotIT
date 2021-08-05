const ErrorHandler = require("../utils/errorHandler");


module.exports = (err,req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage:err.message,
            stack:err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error= {...err}
        error.message  = err.message
        

// wrong mongoose object id error
        if(err.name=='CastError'){
            const message =`Resource not found. Invalid ${err.path}`
            error = new ErrorHandler(message,400)
        }


        //handling mongoose validation error
        if(err.name === 'ValidationError'){
         
            const message = Object.values(err.errors).map(value => value.messsage);
            error= new ErrorHandler(message, 400)
        
        }

//handling mongoose duplicate key errors
if(err.code ===11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    error= new ErrorHandler(message, 400)

}

//handling wrong jwt error 
if(err.name === 'JsonWebTokenError'){
    const message = 'JSON web token is invalid. Try Again!!'
    error= new ErrorHandler(message, 400)

}

//handling expired jwt error 
if(err.name === 'TokenExpiredError'){
    const message = 'JSON web token is expired. Try Again!!'
    error= new ErrorHandler(message, 400)

}

        res.status(error.statusCode).json({
            success:false,
            message:error.message || "Internal Server Error" 
  
        })
    }
  
}