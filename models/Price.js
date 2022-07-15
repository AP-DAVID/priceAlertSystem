import mongoose from "mongoose"
import Product from "./Products"

const PriceSchema = new mongoose.Schema(
  {

    pricevar : {
       type : Number,
       required : true
    },


    email :  {
      type : String,
      required : true,
    },

    product : [
      {
        type : mongoose.Types.ObjectId,
        ref : Product
      }
    ]


 },
  { timestamps: true }
);




module.exports = mongoose.models.Price || mongoose.model("Price", PriceSchema);


