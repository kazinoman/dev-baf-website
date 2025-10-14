"use client"; // যদি আপনি এটাকে client component করতে চান

import React from "react";
import InputForm from "../ui/InputForm";
import { BsPeople } from "react-icons/bs";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schema = z.object({
  name: z.string().min(1, ""),
  email: z.string().email(""),
  description: z.string().min(10, ""),
});

type FromDataType = z.infer<typeof schema>;

const ContactForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: FromDataType) => {
    console.log(data);
  };

  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 bg-[#111] p-4 lg:p-18 lg:mb-24">
      {/* Map */}
      <div className="w-full md:w-1/2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3651.0452483624595!2d90.424043!3d23.781403!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3cc42b4e4b430164!2sReacThemes!5e0!3m2!1sen!2sbd!4v1656420500360!5m2!1sen!2sbd"
          height="500"
          style={{ border: 0, width: "100%" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Contact Form */}
      <div className=" w-full md:w-1/2">
        <h3 className=" text-3xl lg:text-4xl text-white font-semibold mb-5 lg:mb-10">
          GET IN TOUCH
        </h3>

        <form
          className="flex flex-col gap-1 lg:gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputForm
            className="py-4 text-white font-normal bg-[#1a1a1a]"
            type="name"
            placeholder="Type name..."
            error={errors?.name?.message}
            register={register}
            name="name"
            icon={<BsPeople />}
            iconPosition="start"
          />

          <InputForm
            className="py-4 text-white font-normal bg-[#1a1a1a]"
            type="email"
            placeholder="Type Email..."
            error={errors?.email?.message}
            register={register}
            name="email"
            icon={<BsPeople />}
            iconPosition="start"
          />

          <InputForm
            className="py-4 text-white font-normal bg-[#1a1a1a]"
            type="textarea"
            placeholder="Write your message..."
            error={errors?.email?.message}
            register={register}
            name="description"
            icon={<BsPeople />}
            iconPosition="start"
          />

          <Button
            type="submit"
            variant="orange"
            size="medium"
            className="px-10 md:px-14 lg:px-20 cursor-pointer lg:mt-12"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
