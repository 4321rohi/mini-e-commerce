import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from './Card';
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import Paginate from './Paginate';

const Sort = () => {
  const { searchQuery } = useContext(SearchContext);
  const [sort, setSort] = useState("Sort by:Featured");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const res = await axios("http://localhost:3001/products", {
          params: {
            search: searchQuery,
            sort,
            category,
            page,
            limit: 6
          }
        })
        setData(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error(err);
      }
    }

    fetchProduct();


  }, [searchQuery, sort, category, page])

  return (
    <div >
      <div className='flex justify-between px-15 py-2'>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="Sort by:Featured">Featured</option>
          <option value="price_desc">Price:Low to High</option>
          <option value="price_asc">Price:High to Low </option>
          <option value="Sort by:Newest Arrivals">Newest Arrivals</option>
        </select>


        <select id="category"
          onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select...</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="beauty">Beauty</option>
          <option value="sports">Sports</option>
          <option value="furniture">Furniture</option>
        </select>

      </div >


      <Card data={data} />
      <Paginate page={page} setPage={setPage} totalPages={totalPages} />
    </div >
  )
}

export default Sort
