import ConnectToDatabase from "../../../backend/server";
import Product from "../../../models/Products"
import nextConnect from "next-connect";

ConnectToDatabase();
const handler = nextConnect();


handler.get(async(req, res)=>{
  try {
    const product  =  await Product.find({});
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({success: false, error: error})
  }
})

handler.post(async (req, res) => {

  const { productname, price}  = req.body;

 

  try {
    const newProduct = await Product.create({
      productname,
      price
     
    });
    newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
  }
});


handler.put

export default handler;
