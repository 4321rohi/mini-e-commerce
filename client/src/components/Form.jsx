import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import * as yup from "yup";
import toast, { Toaster } from 'react-hot-toast';


const Form = () => {

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
      const result = await axios.post(
        "http://localhost:3001/products",
        formData
      );

      if (result.status === 201) {
        toast.success("Submitted Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something Went Wrong");
    }
  };



  return (
    <div>
      <Toaster />

      <form onSubmit={handleSubmit(onSubmit)} >

        <label htmlFor="name">Name:</label>
        <input {...register("name")} type="text" id="name" placeholder='Product Name' />

        <p>{errors.name?.message && errors.name.message}</p>

        <label htmlFor="price">Price:</label>
        <input {...register("price")} type="text" id="price" placeholder='Price' />

        <p>{errors.price?.message && errors.price.message}</p>

        <label htmlFor="category">Category:</label>

        <select id="category" {...register("category")}>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="beauty">Beauty</option>
          <option value="sports">Sports</option>
          <option value="furniture">Furniture</option>
        </select>

        <p>{errors.category?.message && errors.category.message}</p>

        <label htmlFor="image">Image:</label>
        <input type="file" id="image" {...register("image", {
          onChange: () => trigger("image"),
        })} />

        <p>{errors.image?.message && errors.image.message}</p>

        <button>Submit</button>
      </form >

    </div >
  )
}

export default Form
