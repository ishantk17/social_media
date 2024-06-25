const express=require('express');
const router=express.Router();
const User=require("../models/users")

//send follow request
router.post("/user/follow/:userId",async(req,res)=>{
   const {userId}=req.params;
   const {followerId}=req.body;
   try {
      const user=await User.findById(userId);
      if(!user){
        return res.status(404).json({error:"user not found"});
      }
      if(user.private){
         user.pendingFollowRequests.push(followerId);
         await user.save();

      }
        const follower=await User.findById(followerId);
        if(follower){
            follower.following.push(userId);
            await follower.save();
        }
        res.json(user);

   } catch (error) {
       console.log(error);
       res.status(500).json({error:"server error"});
   }
})

//approve follow request
router.post("/approve/:userId",async(req,res)=>{
   const {userId}=req.params;
   const {followerId}=req.body;
   try {
    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({error:"user not found"});
    }
    if(!user.pendingFollowRequests.includes(followerId)){
        return res.status(400).json({error: "no pending requests"});
    }
    user.pendingFollowRequests=user.pendingFollowRequests.filter(id=>id.toString()!=followerId);
    user.followers.push(followerId);
    await user.save();
    const follower=await User.findById(followerId);
    if(follower){
        follower.following.push(userId);
        await follower.save();
    }

    if(user.private){
        user.private=false;
        await user.save();
    }
    res.json(user);
   } catch (error) {
       console.log(error);
       res.status(500).json({error:"server error"});
   }
})

router.post("/add-user",async(req,res)=>{
try {
    const {name, userName}=req.body;
    const newUser=new User({
        name,
        userName,
        followers:[],
        following:[],
        private:true,
        pendingFollowRequests:[]
    });
    await newUser.save();
    res.json(newUser);
} catch (error) {
    console.log(error);
    res.status(500).json({error:"error"});
}
})

module.exports=router;