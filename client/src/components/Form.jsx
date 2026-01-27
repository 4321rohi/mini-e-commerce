import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import * as yup from "yup";
import toast, { Toaster } from 'react-hot-toast';
import logo from '../assets/logo.png'


const Form = () => {
  const [preview, setPreview] = useState(null);

  const schema = yup.object({
    name: yup
      .string()
      .required("Please Enter Name")
      .min(4, "Must be at least 4 characters long")
      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9 .,+()/-]+$/,
        "Invalid Product Name"
      )
    ,
    price: yup
      .string()
      .required("Price is required")
      .matches(
        /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/,
        "Enter a valid price"
      )
    ,
    image: yup
      .mixed()
      .test("required", "Please enter image", (value) => {
        return value && value.length > 0;
      })
      .test("fileType", "Only JPG/PNG images allowed", (value) =>
        value &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type)
      )
  })

  const { register, handleSubmit, formState, trigger } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("image", data.image[0]); // VERY IMPORTANT
      // formData.append("image", file);
      const result = await axios.post(
        "http://localhost:3001/products",
        formData,
      );

      if (result.status === 201) {
        toast.success("Submitted Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something Went Wrong");
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);


  // [#f0f2f5] width={130}

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className='py-3  px-4 sm:px-6 flex justify-between items-center border border-b border-gray-300'>
        <img src={logo} alt="Logo" className="w-24 sm:w-32" />
        <button className='bg-slate-500
 text-gray-200 rounded  px-4 py-2 hover:bg-blue-900 cursor-pointer'>Product</button>
      </div>

      <Toaster />

      <div className='flex justify-center items-center px-4 py-10'>

        <form onSubmit={handleSubmit(onSubmit)} width={100} className="
    bg-white
    w-full
    max-w-md
    p-6
    sm:p-8
    rounded-lg
    shadow-lg
    space-y-4
    transition
    sm:hover:scale-105
  ">
          <h1 className='font-bold text-lg text-center text-gray-800'>Products Form:</h1>
          <div >
            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded border"
                />
              </div>
            )}
            <label htmlFor="name" className="block mb-1 font-medium  text-gray-800">Name:</label>
            <input {...register("name")} type="text" id="name" placeholder='Product Name' className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" />

            <p className="text-red-500 text-sm">{errors.name?.message && errors.name.message}</p>

            <label htmlFor="price" className="block mb-1 font-medium  text-gray-800">Price:</label>
            <input {...register("price")} type="text" id="price" placeholder='Price' className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" />

            <p className="text-red-500 text-sm">{errors.price?.message && errors.price.message}</p>

            <label htmlFor="category" className="block mb-1 font-medium  text-gray-800">Category:</label>

            <select id="category" {...register("category")} className="w-full border border-gray-300 rounded px-3 py-2">
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
              <option value="furniture">Furniture</option>
            </select>

            <p>{errors.category?.message && errors.category.message}</p>

            <label htmlFor="image" className="block mb-1 font-medium  text-gray-800">Image:</label>
            <input type="file" id="image" {...register("image", {
              onChange: (e) => {
                trigger("image")
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }
            })} className="w-full border border-gray-300 rounded px-3 py-2" />

            <p className="text-red-500 text-sm">{errors.image?.message && errors.image.message}</p>

            <button className="w-full bg-slate-500
 text-white py-2.5 rounded hover:bg-blue-900 transition mt-5 cursor-pointer">Submit</button>
          </div>

        </form >

      </div >



    </div >
  )
}

export default Form
