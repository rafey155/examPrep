const express = require('express')
const router = express.Router();
const Subject = require('../models/Subject');

router.post('/',async(req,res)=>{
    try {
        const subject = new Subject(req.body);
        await subject.save();
        return res.json({message:"Subject Added successfully"});
    } catch (error) {
        console.error("Error saving subject:", error);
        return res.status(500).json({ error: "Failed to add subject" });
    }
})

router.get('/',async(req,res)=>{
    const subject = await Subject.find();

    return res.json({data:subject})
});

router.delete('/:id', async(req,res)=>{
    const {id} =  req.params
    const subject = await Subject.findByIdAndDelete(id);
    //subject.save();
    return res.json({message:"Deleted Successfully"});
})

router.put('/:id', async(req,res)=>{
    const {id} = req.params;
    const subject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({message:"Updated Successfully"});
})
module.exports = router;