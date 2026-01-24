import React from 'react'
import Paginate from './Paginate'

const Card = ({ data }) => {
  return (
    <div className=' py-5 px-15 grid grid-cols-4 grid-rows-2 gap-10 '>
      {
        data && data.map((i) => (
          <div  >
            <ul>
              <img
                src={`http://localhost:3001/${i.image}`}
                alt={i.name}
                className="w-full h-50 object-cover mb-3"
              />
              <li>{i.name}</li>
              <li>{i.price}</li>
              <li>{i.category}</li>

            </ul>
          </div>

        ))
      }

    </div >
  )
}

export default Card
