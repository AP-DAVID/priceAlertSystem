import React, { useState, useEffect } from "react";


export default function Loader({open, setOpen}) {

  return (
    <>
     
      {open ? (
        <>
          <div
            className="justify-center text-white items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
                <div className="items-center space-x-3 flex">
                    <div><h1 className="text-base  font-serif text-white">Loading ...</h1></div>
                    <div><div className="h-10 w-10  border-l-4 border-r-4 rounded-full animate-spin border-blue-900" /> </div>
                </div>
           </div>
          <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
