import React from 'react'
import Paginate from './Paginate'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useState } from 'react';
// py - 5  sm: px - 15 px - 10 grid sm: grid - cols - 4 sm: grid - rows - 2 gap - 3
const Card = ({ data, loading }) => {

  console.log(loading);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-3xl font-bold text-gray-500 animate-pulse">
          Loading...
        </p>
      </div>
    )
  }


  return (
    <div className='  py-5
  px-10
   gap-5 
  max-[700px]:px-5
  min-[800px]:px-5
   max-[700px]:gap-3
  min-[800px]:gap-3
  grid
  sm:grid-cols-4
  sm:grid-rows-2
 '>


      {
        !loading && data && data.map((i) => (
          <div className='w-full border border-gray-400 rounded-md shadow-md bg-gray-100 hover:scale-105 transition-transform cursor-pointer' key={i.id}>
            <ul >
              <img
                src={`http://localhost:3001${i.image}`}
                alt={i.name}
                className="w-full h-50 object-cover mb-3 bg-gray-200 "
              />
              {/* <img src={i.image} alt={i.name} className='w-full h-70 object-cover mb-3' /> */}
              <li className='font-bold text-xl text-gray-600 mb-1'>{i.name}</li>
              <li className='font-bold text-gray-600 text-xl'><MdOutlineCurrencyRupee className='inline' />{i.price}</li>
            </ul>
            <button className='bg-slate-500
  text-gray-100 rounded-bl rounded-br px-5 py-2 hover:bg-blue-900 cursor-pointer mt-2 '>Buy</button>
          </div>

        ))
      }

    </div >
  )
}

export default Card
