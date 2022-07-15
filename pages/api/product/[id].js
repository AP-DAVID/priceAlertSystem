import ConnectToDatabase from "../../../backend/server";
import Product from "../../../models/Products"
import Price from "../../../models/Price"
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



handler.put(async (req, res) => {




 const {
    query:{id}
 }= req


 
  try {
    const product = await Product.findByIdAndUpdate(id,{
        $set : req.body,
    });
  

    product.save();


    const mailData = {
      from: "blytetech@gmail.com",
      subject: `Message From Emailbros`,
      //   text: req.body.message + " | Sent from: " + req.body.email,
      html: `
      <div> <h1>Your price condition of ${req?.body?.price} has been reached </h1> </div>
      <p>Sent from : blytetech@gmail.com</p>`,
    };

    const price = await Price.find({pricevar : req?.body?.price}, {email: 1}).lean()

    if(price){

      price.forEach(function (to, i , array) {
        (function(i,to){
          mailData.to = to?.email;
        

          transporter.sendMail(mailData, function (err, info) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              console.log(info);
              resolve(info);
            }

            if (i === price.length - 1) { mailData.transport.close(); }
        });


      })(i,to)
      });

    }

    res.status(201).json("product updated");
  } catch (error) {
    console.error(error);
  }
});


handler.put

export default handler;
