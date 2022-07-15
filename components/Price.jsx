import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

function Price({email, price, productname}) {

useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="flex flex-col mb-32 sm:flex-row px-6 font-link shadow-md truncate p-7 justify-between items-center">
        {/* The first hald containing the imae and the p and down text */}
        <div className="flex space-x-5 items-center">
            <div>
            <img
                className="rounded-full h-7 w-7 object-cover"
                data-aos="fade-up"
                src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJsYWNrJTIwZ2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            />
            </div>
            <div className="flex flex-col">
            <h4 className="text-sm font-medium truncate px-10" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">{email}</h4>
            </div>
        </div>

        {/* The second half containing the connect button */}
        <div
            className="text-white bg-blue-500 border-2 hover:bg-blue-300 rounded-md cursor-pointer px-2 py-2"
        >
            <h1 className="text-white" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000">{productname} : {price}</h1>
        </div>
    </div>
  )
}

export default Price