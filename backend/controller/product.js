const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const User = require("../model/user");
const { log } = require("console");
const mongoose = require("mongoose");

// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      const files = req.files || [];
      const imageUrls = files.length > 0 ? files.map((file) => `${file.filename}`) : [];

      const { name, description, material, assortment, gender, embellishment, trim_border, pattern, discountPrice, stock } = req.body;

      // Ensure required fields are present
      if (!name || !description || !material || !assortment || !gender || !embellishment || !trim_border || !pattern || !discountPrice || !stock) {
        return next(new ErrorHandler("Please provide all required fields!", 400));
      }

      const productData = {
        ...req.body,
        images: imageUrls,
        shop
      };

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });

    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);


// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(shopId)) {
        return next(new ErrorHandler("Invalid shop ID", 400));
      }

      const products = await Product.find({
        shopId: new mongoose.Types.ObjectId(shopId),
      });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const finduser = req.body.user;
      const { rating, comment, productId, orderId } = req.body;
      const user = await User.findById(finduser)
      if (!user) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }
      const product = await Product.findById(productId);
      const review = {
        user,
        rating,
        comment,
        productId,
      };
       product.reviews.push(review);

      // const isReviewed = product.reviews.find(
      //   (rev) => rev.user._id === req.user._id
      // );

      // if (isReviewed) {
      //   product.reviews.forEach((rev) => {
      //     if (rev.user._id === req.user._id) {
      //       (rev.rating = rating), (rev.comment = comment), (rev.user = user);
      //     }
      //   });
      // } else {
      //   product.reviews.push(review);
      // }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// filter products

router.post("/filterproducts", async (req,res) =>{
const {gender, material , assortment} = req.query
try {
  const filter = {}
  if (gender) filter.gender = gender
  if (material) filter.material = material
  if (assortment) filter.assortment = assortment

  const find = await Product.find(filter)
  res.status(200).send(find)
} catch (error) {
  res.status(400).send(error)
}
})

module.exports = router;
