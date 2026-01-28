// import React from 'react'
// import { CiSearch } from "react-icons/ci";
// const Navbar = () => {
//   return (
//     <div
//     >
//       <div className='flex '>



//         <div className=' bg-white'>
//           <label htmlFor="search"></label>
//           <input type="text" id='search' placeholder='Search Amazon.in' />
//         </div>

//         <div className='bg-orange-200 '>
//           <button  ><CiSearch className='w-10' /></button>
//         </div>



//       </div>

//     </div >
//   )
// }

// export default Navbar

// import React from 'react'
// import { CiSearch } from "react-icons/ci";

// const Navbar = () => {
//   const debounceRef = useRef(null);
//   const clickFunction = async (val) => {
//     if (!val.trim()) return;

//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }
//     debounceRef.current = setTimeout(async () => {
//       try {
//         const res = await axios.get("http://localhost:3001/search", {
//           params: { search: val }
//         });

//         console.log("API Response:", res.data);
//       } catch (error) {
//         console.error("API Error:", error);
//       }
//     }, 500);

//   }

//   return (
//     <div className='min-h-screen flex justify-center items-center'>

//       <div className="flex ">
//         <input
//           type="text"
//           id="search"
//           placeholder="Search Amazon.in"
//           className=" px-4 py-2 rounded-l-md border border-slate-400"
//           onChange={(e) => clickFunction(e.target.value)}
//         />


//         <button className="bg-orange-300 px-4 rounded-r-md flex items-center justify-center">
//           <CiSearch className="text-2xl text-black" />
//         </button>
//       </div>


//     </div >
//   )
// }

// export default Navbar

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { SearchContext } from "../context/SearchContext";
import { useContext } from "react";
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  const { setSearchQuery } = useContext(SearchContext);

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);



  const handleSearchChange = (val) => {
    setSearch(val);


    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!val.trim()) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/products`,
          {
            params: {
              search: val,
              page: 1,
              limit: 8, // suggestions limit
            },
          }
        );

        setSuggestions(res.data.products);
      } catch (err) {
        console.error("Suggestion error:", err);
      } finally {
        setLoading(false);
      }
    }, 500);
  };


  const handleFinalSearch = async () => {
    if (!search.trim()) return;
    setSearchQuery(search);
    // try {
    //   const res = await axios.get(
    //     "http://localhost:3001/products",
    //     {
    //       params: {
    //         search,
    //         page: 1,
    //         limit: 6,
    //       },
    //     }
    //   );

    //   console.log("Final products:", res.data.products);
    //   setSuggestions([]); // close dropdown
    // } catch (err) {
    //   console.error("Final search error:", err);
    // }
    setSuggestions([]);
  };


  const handleSuggestionClick = (name) => {
    setSearch(name);
    setSearchQuery(name);
    setSuggestions([]);
    // handleFinalSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFinalSearch();
    }
  };

  const handleClick = () => {
    navigate("/form")
  }


  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  return (
    <div className="flex justify-between items-center py-2  bg-gray-100 sm:px-5  px-1">
      <img src={logo} alt="Logo" className="w-24 sm:w-32" />
      <div className="relative sm:w-96 ">

        {/* SEARCH INPUT */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="sm:px-4 sm:py-2 py-1 px-2  border sm:w-full  w-1/2 rounded-l-md focus:outline-none"
          />

          <button
            onClick={handleFinalSearch}
            className=" bg-gray-400 sm:px-4 px-2 rounded-r-md flex items-center hover:bg-gray-300 cursor-pointer "
          >
            <CiSearch className="text-xl" />
          </button>
        </div>



        {/* SUGGESTIONS */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border mt-1 rounded shadow z-10">
            {suggestions.map((item) => (
              <div
                key={item._id}
                onClick={() => handleSuggestionClick(item.name)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.name}
              </div>
            ))}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="absolute right-3 top-3 text-sm text-gray-500">
            Loading...
          </div>
        )}

      </div>
      <button className=' bg-slate-500
  text-gray-200 rounded  sm:px-4 sm:py-2 px-1 py-1  sm:hover:bg-blue-900 sm:cursor-pointer' onClick={handleClick}>Form</button>
    </div >
  );
};

export default Navbar;

