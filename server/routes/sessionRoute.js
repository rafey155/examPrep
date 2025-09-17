const express = require('express')
const router = express.Router();
const Session = require('../models/Session');

router.post('/',async(req,res)=>{
    const session = new Session(req.body)
    session.save();
    return res.json({message:"Session Added successfully"})
})

router.get('/',async(req,res)=>{
    const session = await Session.find();

    return res.json({data:session})
});

router.delete('/:id', async(req,res)=>{
    const {id} =  req.params
    const session = await Session.findByIdAndDelete(id);
    //session.save();
    return res.json({message:"Deleted Successfully"});
})

router.put('/:id',async(req,res)=>{
    const {id} = req.params
    const session = await Session.findByIdAndUpdate(id, req.body);
    return res.json({message:"updated Successfully"}); 
})

module.exports = router;
