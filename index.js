import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import { app } from "./src/app.js"

dotenv.config({
    path: './.env'
});

const port = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port : ${port}`)
    })
})
.catch((err) => {
    console.log("Mongo db connection failed !!!", err);
})
