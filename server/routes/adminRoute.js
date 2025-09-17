const Admin = require('../models/Admin');
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{

    const admin = new Admin(req.body);
    admin.save();
    return res.status(200).json("Admin register successfully");
});

router.post('/login',async(req,res)=>{
    const{email,password} = req.body;
    const admin = await Admin.findOne({email:email});
    if(admin.password==password){
        return res.json({message:"Admin login successfully",admin:{
            role:'admin',
            id:admin._id,
            email:admin.email
        }});
    }
    else{
        return res.json({messsage:"Invalid email or password"});
    }

    return res.json(admin)
})

// change password LOGIC
router.put('/change/:email',async(req,res)=>{
    const {op,np,cnp} = req.body;
    const admin = await Admin.findOne({email:req.params.email});    
    if(!admin){
        return res.json({message:"Admin not found"})
    }
    if(admin.password !== op){
        return res.json({message:"Old Password is Incorrect"})
    }  
    if(np !== cnp){
        return res.json({message:"New Password and Confirm Password do not match"})
    }
    try{
      const updatedAdmin = await Admin.findOneAndUpdate(
        { email: req.params.email },
        { password: np },
        { new: true }
      );
      if (updatedAdmin) {
        return res.json({ message: "Password Changed Successfully" });
      } else {
        return res.status(404).json({ message: "Admin not found" });
      }
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ message: "Server error while changing password" });
    }
})

module.exports = router