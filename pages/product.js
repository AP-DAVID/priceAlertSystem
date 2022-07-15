import React from 'react'
import { Popconfirm, message } from 'antd';
import axios from 'axios';
import { useState, useEffect } from "react";
import Loader from '../components/loader';
import {getProduct} from "../fetchdata/productFetcher"
import { useRouter } from 'next/router'
import AOS from "aos";
import "aos/dist/aos.css";


function Product() {
   const [products_data, setProductsData] = useState([]);
   const router = useRouter()
     const [open, setOpen] = useState(false);
   const {product, isLoading} = getProduct(products_data[0]?._id)


   const [form, setForm] = useState({
    productname : product?.productname,
    price: product?.price,
  });

  function cancel(e) {
    console.log(e);
    message.error('No biggie');
  }


  useEffect(() => {
    const getProduct = async () => {
      try{
        const response = await axios.get("/api/product")

        setProductsData(response.data);

      }catch(error){
        message.error("couldn't load products")
      }
    }

    getProduct();
   
  },[])


  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const handleSubmit = async () => {
    setOpen(true)
    const config = {
        headers: {
            "Accept" : "application/json",
            'Content-type' : "application/json"
        }
      }
      
     try{

        const response = await axios.put(`/api/product/${product?._id}`, form, config);
        message.success("updated successfully")
        setOpen(false)
        router.push("/")
    }catch(error){
        setOpen(false)
        message.error("Something went wrong")
     }
  }


   const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="App">
        <div className="App-header">
            <div className='flex flex-col space-y-7 '>
                <img data-aos="zoom-in" className='rounded h-52 px-5 w-96 object-cover' src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d3Jpc3R3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
                <Loader open={open} setOpen={setOpen} />
                <h1 className='text-white'>
                    Name  
                </h1>
                
                <div data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" className='flex justify-center'><input type="text" name="productname" onChange={handleChange} value={form.productname} placeholder='enter your name' className='px-2 w-5/6 sm:w-full text-black rounded-md h-14 bg-gray-200'/></div>
                
                
                <h1 className='text-white'>
                    Price  
                </h1>
                 <div className='flex justify-center'><input type="number" name="price" onChange={handleChange} value={form.price} placeholder='enter your Price' className=' px-2 w-5/6 sm:w-full  text-black rounded-md h-14 bg-gray-200'/></div>
                 
                <div data-aos="fade-up" data-aos-duration="1500" className='flex justify-center'>

                <Popconfirm
                    title="Are you sure you want to update this product?"
                    onConfirm={handleSubmit}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                <h1 className='bg-blue-500 w-5/6 sm:w-full text-white mt-10 px-4 cursor-pointer py-4 rounded-md '>
                    set product update
                </h1>
                </Popconfirm>
            </div>
           
            </div>

        </div>
    </div>
    
   
  )
}

export default Product