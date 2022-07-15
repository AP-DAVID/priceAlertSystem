import ConnectToDatabase from "../../../../backend/server"
import Product from "../../../../models/Products"

import nextConnect from "next-connect"


ConnectToDatabase();
const handler = nextConnect();


handler.get(async(req, res)=>{
      

   try {

         const {
           query: {id}
         } = req


      const product = await Product.findById(id).lean()

       res.status(200).json(product);

  } catch (error) {
      res.status(500).json(error);
  }

  

     
})






  
export default handler;