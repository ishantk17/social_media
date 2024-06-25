const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=Schema({
    name:{
        type:String,
    },
    userName:{
        type:String,
    },
    followers:[{
        type:Schema.Types.ObjectId,
        ref:'users'
    }],
    following:[{
        type:Schema.Types.ObjectId,
        ref:'users'
    }],
    private:{
        type:Boolean,
        default:true
    },
    pendingFollowRequests:[{type:Schema.Types.ObjectId,ref:'users'}]
});

module.exports=mongoose.model("users",userSchema);