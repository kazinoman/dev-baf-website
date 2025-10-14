"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import InputForm from "../ui/InputForm";
import Button from "../ui/Button";
import { BsPeople } from "react-icons/bs";

const schema = z.object({
    name: z.string().min(1, ''),
    email: z.string().email(''),
    description: z.string().min(10, '')
})

// form type 
type FormData = z.infer<typeof schema>;



const CommentForm = () => {

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({resolver: zodResolver(schema)});


  const onSubmit = (data:FormData) => {
    console.log('on submit form', data)
  }

 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Description  */}
      <InputForm  type="textarea" placeholder="Type Description.." error={errors?.description?.message} register={register} name="description"  />

      {/* Name Filed  */}
      <InputForm  type="text" placeholder="Type Name..." error={errors?.name?.message} register={register} name="name" />

      {/* Email Filed  */}
      <InputForm type="email" placeholder="Type Email..." error={errors?.email?.message} register={register} name="email"  icon={<BsPeople />} iconPosition="end" />
       


       <Button type="submit" variant="orange" size="medium" className="px-10 md:px-14 lg:px-20" >Submit</Button>
    </form>
  );
};

export default CommentForm;
