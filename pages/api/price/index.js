import ConnectToDatabase from "../../../backend/server";
import Price from "../../../models/Price"
import Product from "../../../models/Products"
import nextConnect from "next-connect";
let nodemailer = require("nodemailer");




ConnectToDatabase();
const handler = nextConnect();


 const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD
    },
    secure: true,
  });


  // const maillist = [
  //   "akintolaapre@gmail.com",
  //   "akintoladavidskills@gmail.com",
  //   "gamex391@gmail.com",
  //   "akintola0536@student.babcock.edu.ng"
  // ]


  





handler.get(async(req, res)=>{
  try {
    const price  =  await Price.find({}).populate({path : "product", model: Product}).lean().exec();
    res.status(200).json(price.reverse())
  } catch (error) {
    res.status(400).json({success: false, error: error})
  }
})

handler.post(async (req, res) => {
  
  const { email, pricevar, product }  = req.body;
  const price = await Price.findOne({email : email, pricevar : pricevar});
  const getProduct = await Product.find({}, {price: 1}).lean();
  if (price) return res.status(200).send("multiple");

  const mailData = {
    from: "blytetech@gmail.com",
    to: email,
    subject: `Message From Crogam`,
    //   text: req.body.message + " | Sent from: " + req.body.email,
    html: `
    <div> <h1>Your price condition of ${pricevar} has been reached </h1> </div>
    <p>Sent from : blytetech@gmail.com</p>`,
  };
 

  try {
    const newPrice = await Price.create({
      email,
      pricevar,
      product
     
    });
    newPrice.save();

    
    // maillist.forEach(function (to, i , array) {
    //   (function(i,to){
    //     mailData.to = to;
      

    //     transporter.sendMail(mailData, function (err, info) {
    //       if (err) {
    //         console.log(err);
    //         reject(err);
    //       } else {
    //         console.log(info);
    //         resolve(info);
    //       }

    //       if (i === maillist.length - 1) { mailData.transport.close(); }
    //   });


    // })(i,to)
    // });

    if(getProduct[0]?.price == pricevar){
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });
  }

    res.status(201).json(newPrice);
  } catch (error) {
    console.error(error);
  }
});

export default handler;
