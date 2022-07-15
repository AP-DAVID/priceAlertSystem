import React, { useEffect, useState } from 'react'
import Price from '../components/Price';
import axios from 'axios'
import { Popconfirm, message } from 'antd';


function Pricee() {
 const [prices, setPrices] = useState();


 useEffect(() => {
    const getPrices = async () => {
      try{
        const response = await axios.get("/api/price");
        setPrices(response.data)

      }catch(error){
         message.error("we couldn't load the price storage")
      }
    }

    getPrices()
 })
  return (
    <div className="px-5 py-20 space-y-3 flex flex-col">
        <h1 className='text-center font-medium text-2xl mt-5'>Here is the list of the recorded prices so far</h1>

        {
            prices?.map((price) => (
                <Price key={price?._id} price={price?.pricevar} email={price?.email} productname={price?.product[0]?.productname}/>
            ))
        }
     
    </div>
  );
}

export default Pricee