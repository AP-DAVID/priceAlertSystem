import mongoose from "mongoose"


const ProductSchema = new mongoose.Schema(
  {

    productname : {
       type : String,
       required : true
    },


    price :  {
      type : Number,
      required : true,
      default : 0
    },
    

 },
  { timestamps: true }
);




module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);