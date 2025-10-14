'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const schema = z.object({
  email: z.email()
})

type FormDataType = z.infer<typeof schema>


const SubscribeNewsletter = () => {
      const {handleSubmit, register, formState: {errors} } = useForm({ resolver: zodResolver(schema) })

      const onSubmit = (data:FormDataType) => {
            console.log(data)
      }



  return (
    <section className="rts-newsletter-section2 pt-20 ">

      <div className="">

        <div className="newsletter-inner flex flex-col md:flex-row md:items-center md:justify-between px-12 py-16 md:px-8 md:py-10 rounded-lg relative">
         

          <h3 className="newsletter-heading text-2xl font-bold mb-4 text-[#fff]">SUBSCRIBE NEWSLETTER</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">

            <div className="w-full relative rounded-tl-lg rounded-bl-lg  overflow-hidden">
              <input
                type="text"
                {...register('email')}
                className={`w-full py-4 pl-6 pr-48 text-gray-700 bg-white  focus:outline-none ${errors ? 'border-red-500 ' : 'border-gray-300' }`}
                id="username"
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div className="button">
              <button
                type="submit"
                className="w-full py-4 px-10 text-white font-semibold bg-[#e41b23] transition-colors"
              >
                SUBSCRIBE
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default SubscribeNewsletter;
