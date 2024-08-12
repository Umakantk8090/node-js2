const express=require('express');
const router=express.Router();
const menuItem=require('../models/menu');

router.post('/', async(req,res)=>{
  try {
    const data=req.body
  const newMenu=new menuItem(data);
  const response= await newMenu.save();
  console.log('menu data saved');
  res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'internal server error'});
    
  }
  
});
router.get('/', async(req,res)=>{
 try {
  const data=await menuItem.find();
  console.log('menu data fetched');
  res.status(200).json(data);
 } catch (error) {
  console.log(error);
  res.status(500).json({error:'internal server menu error'});
  
 }
  
})
router.get('/:tasteType', async(req,res)=>{
   try {
    const tasteType=req.params.tasteType
    if(tasteType==='chicken' || tasteType==='spicy' || tasteType==='sweet' ){
        const response=await menuItem.find({taste:tasteType});
        console.log('fetch menu data');
        res.status(200).json(response);
        

    }else{
        res.status(404).json({error:'error in else'});
    }
   } catch (error) {
    console.log(error);
    res.status(500).json({error:'internal server error'});
    
   }

})
router.put('/:id',async(req,res)=>{
  try {
    const menuId=req.params.id
    const menuIdUpdate=req.body
    const response=await menuItem.findByIdAndUpdate(menuId, menuIdUpdate, {
      new:true,
      runValidators:true,
    })
    if(!response){
      return res.status(404).json({error:'menu not fount'});

    }
    console.log('data fetched');
    res.status(200).json(response);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'internal server error'});
    
  }
})
router.delete('/:id', async(req,res)=>{
  try {
    const menuId=req.params.id
    const response=await menuItem.findByIdAndDelete(menuId);
    if(!Response){
      return res.status(404).json({error:'menu deleted'});

    }
    console.log('data save');
    res.status(200).json({message:'menuitems deleted'});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'internal server error'});
    
  }
})
//for testing purpose


module.exports=router;