const appMiddleware = (req,res,next)=>{
    console.log("Inside the appMiddleware");
    next()
}
module.exports = appMiddleware