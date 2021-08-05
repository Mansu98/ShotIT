const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");


//handling uncaught exception  (undefined variable bata aako error)

process.on('uncaughtException',err =>{
    console.log(`ERROR:${err.stack}`);
    console.log("Shutting down the server due to uncaught exception");
    server.close(()=>{
        process.exit(1)
    })
})


dotenv.config({path:"backend/config/config.env"})

connectDatabase();
app.listen(process.env.PORT,()=>{
    console.log(`Server listening on Port: ${process.env.PORT} in ${process.env.NODE_ENV}mode.` )
})


//handling unhandled promise rejection ( env file ma aako error)
process.on('unhandledRejection',err =>{
    console.log(`ERROR:${err.message}`);
    console.log("Shutting down the server due to Unhandled promise rejection");
    server.close(()=>{
        process.exit(1)
    })
})