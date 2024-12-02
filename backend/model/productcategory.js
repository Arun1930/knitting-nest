const mongoose = require("mongoose")

const GenderSchema = new mongoose.Schema({
    Gender:{
        type:String,
        required:true
    },
   
})
 const Gender = new mongoose.model("Gender" , GenderSchema)


 const MaterialSchema = new mongoose.Schema({
    material:{
      type:String,
      required:true
    }
 }
 )

 const Material = new mongoose.model("Material" , MaterialSchema)



 const AssortmetSchema = new mongoose.Schema({
    Assortment :{
        type : String,
        required :true
    }
 })

 const Assortment = new mongoose.model("Assortment" , AssortmetSchema)


 module.exports = { Assortment , Material , Gender }