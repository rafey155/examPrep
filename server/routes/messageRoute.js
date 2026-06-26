const express = require('express');
const router = express.Router();
const Examinee = require('../models/Examinee');
const Message = require('../models/Message');

router.post('/',async(req,res)=>{
    try {
        const{question,email} = req.body;
        const user = await Examinee.findOne({email:email});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        const id = user._id;
        const contact = new Message({question:question,examineeId:id});
        await contact.save();
        res.json({message:"Message Sent Successfully"})
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ error: "Failed to send message" });
    }
})

router.get('/:id',async(req,res)=>{
    const id = req.params;
    const msg = await Message.find({examineeId:id.id}).populate('examineeId');
    return res.json({message:msg});
})

module.exports = router