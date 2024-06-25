const express=require('express');
const mongoose=require('mongoose');
const userRoutes=require("./routes/route");
const bodyParser=require('body-parser');

const app=express();
const port=5000;

const mongoURI='mongodb://localhost:27017/social_media'
app.use(bodyParser.json());

app.use('/',userRoutes);
mongoose.connect(mongoURI).then(()=>{
    app.listen(port,console.log("server runnig at port 5000"));
}).catch(err=>console.log(err));
