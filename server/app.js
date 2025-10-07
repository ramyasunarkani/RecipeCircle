require('dotenv').config();
const cookieParser = require("cookie-parser");
const cors=require('cors')
const db=require('./utils/db-connection');
require('./models')

const express=require('express');
const authRoutes=require('./routes/authRoute')
const recipeRoutes=require('./routes/recipeRoutes')
const favouriteRoutes=require('./routes/favoriteRoutes')
const collectionRoutes=require('./routes/collectionRoutes')
const reviewRoutes=require('./routes/reviewRoutes')
const socialRoutes=require('./routes/socialRoutes')
const adminRoutes=require('./routes/adminRoutes')





const app=express();
app.use(express.json())
app.use(cookieParser()); 

app.use(cors({
    origin:process.env.FRONT_END_URL,
    credentials:true,
}));



app.get("/", (req, res) => res.send("Backend is running"));
app.use("/auth",authRoutes);
app.use("/recipes",recipeRoutes);
app.use("/favorites",favouriteRoutes);
app.use("/collections",collectionRoutes);
app.use("/review",reviewRoutes);
app.use("/social",socialRoutes);
app.use("/admin",adminRoutes);






db.sync({force:true}).then(()=>{
    console.log('Database sync');
    app.listen(process.env.PORT,()=>{
        console.log('app running on',process.env.PORT)
    })

}).catch((err)=>{
    console.error(err.msg,"Database not sync")
})