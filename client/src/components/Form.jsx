import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from 'react-hot-toast';


const Form = () => {

  const schema = yup.object({
    name: yup
      .string()
      .required("Please Enter Name")
      .min(4, "Must be at least 4 characters long")
      .matches(/^[0-9]*[a-zA-Z][a-zA-Z0-9]*$/
        , "Name should contain some characters")
    ,
    price: yup
      .number()
      .transform((value) =>
        isNaN(value) ? undefined : value
      )
      .typeError("Price must be a number")
      .required("Price is required")
      .min(0, "Price must be positive"),
    category: yup.string().required("Please Enter Category"),
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



  return (
    <div>
      <Toaster />

      <form onSubmit={handleSubmit((data) => {
        console.log(data);
        toast.success("Product created successfully");
      })} noValidate>

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
