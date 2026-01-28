import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from './Card';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import Paginate from './Paginate';
import Navbar from './Navbar';

const Sort = () => {
  const { searchQuery } = useContext(SearchContext);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const res = await axios(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/products`, {
          params: {
            search: searchQuery,
            sort,
            category,
            page,
            limit: 8
          }
        })
        setData(res.data.products);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error(err);
      }
    }

    fetchProduct();


  }, [searchQuery, sort, category, page])

  return (
    <div className='flex flex-col ' >
      <Navbar />
      <div className='flex justify-between sm:px-15 py-2 px-2 bg-gray-300'>
        <select onChange={(e) => setSort(e.target.value)} className='border border-gray-500 rounded font-medium cursor-pointer '>
          <option value="">Featured</option>
          <option value="price_desc">Price:Low to High</option>
          <option value="price_asc">Price:High to Low </option>
          <option value="Newest_Arrivals">Newest Arrivals</option>
        </select>

        {!searchQuery &&
          <select id="category"
            onChange={(e) => setCategory(e.target.value)} className='border border-gray-500 rounded font-medium sm:px-3 cursor-pointer'>
            <option value="">Select...</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="beauty">Beauty</option>
            <option value="sports">Sports</option>
            <option value="furniture">Furniture</option>
          </select>

        }


      </div >


      <Card data={data} loading={loading} />
      <Paginate page={page} setPage={setPage} totalPages={totalPages} loading={loading} />
    </div >
  )
}

export default Sort
