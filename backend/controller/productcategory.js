const express = require("express");
const router = express.Router();
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { Assortment , Material , Gender } = require("../model/productcategory");
const messages = require("../model/messages");

router.post('/addgender' ,async(req,res) =>{
   const gender =  req.body
   try {
    if (!gender) {    
        return(res.status(400).json("Please give the gender"))
      }
      else{
   const savegender = gender
   const gen = await Gender.create(savegender)
   res.status(200).json(`Gender Added successfully ${gen.Gender}`)
      }
   } catch (error) {
    res.status(400).send(error)
   }
})


router.delete("/deletegender/:id", async (req,res) =>{
    const gender = req.params.id
    const findgendr = await Gender.findByIdAndDelete(gender)
    res.status(200).json("gender deleted successfully")
})

router.get("/getallgender" , async(req,res) =>{
    try {
        const getgender = await Gender.find()
        res.status(200).send(getgender  )
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/addmaterial" , async(req,res) =>{
    const materialbody = req.body
    try {
         const checkmaterial = await Material.findOne(materialbody)
         if (checkmaterial) {
            return res.status(400).json("material already exist")
         }
         else{
         const save = await Material.create(materialbody)
         return res.status(200).json(`material saved successfully ${save}`)
         }
    } catch (error) {
        res.status(400).send({
            messages:error
        })
    }
})

router.get("/getmaterial" , async (req,res) =>{
    try {
      const getmaterial =  await Material.find()
      res.status(200).send(getmaterial)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/deletematerial/:id" , async (req,res) =>{
    const materialbody = req.params.id
    try {
      const materialdelete = await Material.findByIdAndDelete(materialbody)
      res.status(200).json("materialdeleted successfully")      
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/addassortment", async (req,res) =>{
    const assortmentbody = req.body
    try {
        const checkassortment = await Assortment.findOne(assortmentbody)
        if (checkassortment) {
            return res.status(400).send("Assortment is added successfully")
        } else {
            const save = await Assortment.create(assortmentbody)
            res.status(200).json(`Assortment is added successfully ${save.Assortment}`)
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/getassortment" , async (req,res) =>{
    try {
    const assortment = await Assortment.find()
        res.status(200).send(assortment)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/deleteassortment/:id" , async (req,res) =>{
    const bodyassortment = req.params.id
    try {
        const deleteassortment = await Assortment.findByIdAndDelete(bodyassortment)
        res.status(200).send("Assortment deleted successfully")
    } catch (error) {
        res.status(200).send(error)
    }
})


module.exports = router
