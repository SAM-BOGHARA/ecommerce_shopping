const app = require("./app")
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary").v2



// Config
dotenv.config({path:"backend/config/config.env"})


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });


// Connecting to database
connectDatabase()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.CLOUDINARY_API_SECRET,
})


const server = app.listen(process.env.PORT, ()=> {

    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});


// Unhandled Promise Rejections
process.on("Unhandled Rejections", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the Server due to Unhandled Promise Rejections`)

    server.close(() => {
        process.exit(1)
    });
});