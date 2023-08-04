import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
const app = express();
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";


app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));

app.use(cookieParser());

app.use('/ping',(req,res)=>{
    res.send('pong');
});
//3 route config

app.use('/api/v1/user',userRoutes);

app.all('*',(req,res)=>{
    res.status(400).send("OOPs 404 not found");
});
app.use(errorMiddleware);

// module.exports= app;
export default app;