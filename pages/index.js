
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loader from '../components/loader';
import { Popconfirm, message } from 'antd';
import { Field, Form, Formik, ErrorMessage  } from "formik";
import axios from 'axios';
import * as yup from "yup";


export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [products_data, setProductsData] = useState([]);
  const [messagee, setMessage] = useState("");

  
 


 
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

 
  const handleRequest = async (values, setSubmitting, resetForm) => {

      setOpen(true)
      setSubmitting(true);

      values.product =  await products_data[0]?._id
      const config = {
        headers: {
            "Accept" : "application/json",
            'Content-type' : "application/json"
        }
      }

       try{
          const response = await axios.post('/api/price', values, config);
          if(response.data == "multiple"){
            message.error("The same price has already been set for the email")
            setOpen(false)
            setSubmitting(false);
            resetForm({values : ''})
          }
          else{
            router.replace(router.asPath);
            setOpen(false)
            message.success("price condition set successfully")
            setSubmitting(false);
            resetForm({values : ''})
          }
         
       }catch(error){
        console.log(error)
        setSubmitting(false);
        setOpen(false)
        message.error("price couldn't be set")
       }
  
    
  }


  const handleSubmit = async(values, setSubmitting, resetForm) => {
     handleRequest(values, setSubmitting, resetForm)

  }


  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email address format").required("Email is required"),
    pricevar : yup.number().typeError('you must specify a price').required("price is required")
  });



  return (
    <div className="App ">
      <header className="App-header space-y-11">
        <p className='text-5xl mt-10'>
         Price alert system
        </p>

        <div className=' w-full flex flex-col  sm:flex-row  justify-around'>
           <div>
              <img className='rounded h-72 sm:h-96 px-5 w-96 object-cover' src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d3Jpc3R3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"/>
              <h1 className='text-white'>{products_data[0]?.productname}</h1>
              <h1 className='text-white'>Price : {products_data[0]?.price}</h1>
              <div onClick={() => router.push("/product")} className="flex justify-center"><h1 className="text-white text-sm mt-2 hover:bg-blue-400 bg-blue-500 px-2 py-2 rounded cursor-pointer">Update product price</h1></div>
           </div>

           <Loader open={open} setOpen={setOpen} />

        

        <Formik
            initialValues={{ email: "",  pricevar : 0, product : ""}}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleSubmit(values, setSubmitting, resetForm);
            }}
            validationSchema={validationSchema}
        >
          {({ touched, errors, values, isSubmitting }) => (
          <Form className='space-y-3 py-3'>
            <h1 className="font-medium text-red-500 text-center p-4 text-base">
                  {messagee}
            </h1>

            <h1 className='text-white'>
              Enter your email
            </h1>

            <Field name="email" type="email" placeholder='enter your email' className=' px-2 w-5/6 sm:w-full text-black rounded-md h-14 bg-gray-200'/>
             {errors.email&& touched.email? <div className="text-red-800 font-medium flex px-10">{errors.email}</div> : null}

            <h1 className='text-white'>
              Enter your price
            </h1>

            <Field name="pricevar" type="number" placeholder='enter your price' className=' px-2 w-5/6 sm:w-full text-black rounded-md h-14 bg-gray-200'/>
            {errors.pricevar && touched.pricevar ? <div className="text-red-800 font-medium flex px-10">{errors.pricevar}</div> : null}
           
             
            <div className='flex justify-center'>
                <button type="submit" disabled={isSubmitting ? true : false}>
                  <h1 className='bg-blue-500 w-5/6 sm:w-full text-white mt-10 px-4 cursor-pointer py-4 rounded-md '>
                      set price alert
                  </h1>
                </button>
            </div>

            <div onClick={() => router.push("/price")} className="flex justify-center"><h1 className="text-white text-sm mt-2 hover:bg-blue-400 bg-blue-500 px-2 py-2 rounded cursor-pointer">See prices set</h1></div>
            
            </Form>
          )} 
          </Formik>
        </div>
       
        
      
      </header>
    </div>
  )
}
