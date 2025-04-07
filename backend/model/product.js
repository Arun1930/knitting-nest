const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  material: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  assortment : {
    type:String,
    required:[true , "please add asssortment"]
  },
  gender : {
    type : String,
    required : true
  },
  embellishment : {
    type : String,
    required : true
  },
  trim_border : {
    type : String,
    required : true
  },
  pattern : {
    type : String,
    required : true
  },
  colors: [
    {
        type: String, 
        required: true,
    },
],

  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shop',
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);




