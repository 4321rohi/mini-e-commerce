import { useContext } from "react";
import { useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { useEffect } from "react";

const Paginate = ({ page, setPage, totalPages, loading }) => {

  // const [click, setClick] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  let pages = [];
  // const { searchQuery } = useContext(SearchContext);

  if (totalPages > 0) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // useEffect(() => {

  //   const func = async () => {

  //     const result = await axios.get("http://localhost:3001/products", {
  //       params: {
  //         search: searchQuery,
  //         sort: sort,
  //         category: category
  //       }
  //     });
  //     setTotalPages(result.data.totalPages);

  //   }
  //   func();
  // }, [])

  const arr = [1, 2, 3, '...', totalPages];
  const brr = [1, 2, 3, 4, 5, '...', totalPages];
  const crr = ['...', page - 1, page, page + 1, '...', totalPages]
  const drr = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]


  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  }
  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }
  const handleButton = (val) => {
    if (val !== '...' && val < totalPages - 1) {
      setPage(val);
    }
  }

  const handleButtonSecondary = (val) => {
    if (val !== '...') {
      setPage(val);
    }
  }




  return (
    <div>
      {
        !loading && < div className="flex justify-center items-center min-h-5 border rounded border-gray-300 px-2" >
          <div className="sm:w-1/3 w-full h-11 bg-gray-100 flex justify-between items-center sm:px-4 px-2 border rounded">
            <button onClick={handlePrev} className="cursor-pointer hover:border border-b border-b-gray-400">Previous</button>
            {

              pages.length < 6 ? (pages.map((i) => (

                <button className={`${i === page ? "border-black" : "border-gray-300"} border px-3 py-1`}
                  key={i}
                  onClick={() => handleButtonSecondary(i)}
                >
                  {i}
                </button>
              ))) : click <= 3 ? (
                arr.map((i, idx) => (
                  <button key={idx} onClick={() => handleButton(i)} className={`${i === page ? "border-black" : "border-gray-300"} border px-3 py-1`}
                  >
                    {i}
                  </button>
                ))
              ) : click === 4 ? (

                brr.map((i, idx) => (
                  <button key={idx} onClick={() => handleButton(i)} className={`${i === page ? "border-black" : "border-gray-300"} border px-3 py-1`}
                  >
                    {i}
                  </button>
                ))
              ) : click > 4 && click < totalPages - 2 ? (
                crr.map((i, idx) => (
                  <button key={idx} onClick={() => handleButton(i)} className={`${i === page ? "border-black" : "border-gray-300"} border px-3 py-1`}
                  >
                    {i}
                  </button>


                ))) : (

                drr.map((i, idx) => (
                  <button key={idx} onClick={() => handleButtonSecondary(i)} className={`${i === page ? "border-black" : "border-gray-300"} border px-3 py-1`}
                  >
                    {i}
                  </button>
                ))


              )




            }
            <button onClick={handleNext} className="cursor-pointer hover:border border-b border-b-gray-400">Next</button>
          </div>

        </ div >
      }


    </div>




  )

}
export default Paginate