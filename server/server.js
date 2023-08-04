import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT,(req, res)=>{
    console.log(`app is running on${PORT}` )

});
