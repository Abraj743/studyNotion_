import React from 'react'
import { useState,useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"
 const ContactUsForm = () => {
    const [loading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessfull}
    }=useForm();
    const submitContactForm=async(data)=>{
       console.log("Logged Data",data);
       try{
        setLoading(true);
        // const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
        const res = await apiConnector(
            "POST",
            contactusEndpoint.CONTACT_US_API,
            data
          )
        // console.log("Logging response",response);
        setLoading(false);
       }
       catch(error)
       {
             console.log("Error",error.message);
             setLoading(false);
       }
    }
    useEffect(()=>{
        if(isSubmitSuccessfull)
        {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessfull])
  return (
    <form 
    className="flex flex-col gap-7"
    onSubmit={handleSubmit(submitContactForm)}>
       <div className='flex flex-col gap-5 lg:flex-row'>
       <div className='flex flex-col gap-2 lg:w-[48%]'>
       {/* first name */}
            <label htmlFor='firstname' className="lable-style">First Name</label>
            <input
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Enter first name'
                // new things to learn 
                {...register("firstname",{required:true})}
                className='form-style'
            />
            {
                errors.firstname && (<span className="-mt-1 text-[12px] text-yellow-100">Please enter your name</span>)
            }
        </div>
        {/* last name */}
        <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor='lastname' className="lable-style">Last Name</label>
            <input
                type='text'
                name='lastname'
                id='lastname'
                placeholder='Enter last name'
                // new things to learn 
                {...register("lastname")}
                className='form-style'
            />
            
        </div>
        </div>
        {/* email */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='email' className="lable-style">Email Address</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter email Address'
              {...register("email",{required:true})}
              className='form-style'
            />
            {
                errors.email && (<span className="-mt-1 text-[12px] text-yellow-100">Enter your email</span>)
            }
        </div>
        {/* phone no */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='phonenumber' className="lable-style">Phone Number</label>
          <div className='flex gap-5'>
          <div className="flex w-[81px] flex-col gap-2">
             {/* dropdown */}
                <select 
                name='dropdown'
                id='dropdown'
                className='form-style'
                {...register("countrycode",{required:true})}
                
                >
                    {
                       CountryCode.map((element,index)=>{
                        return (
                            <option key={index} value={element.code}>
                                {element.code}-{element.country}
                            </option>
                        )
                       })
                    }
                </select>
                </div>
                <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                <input
                    type='number'
                    name='phonenumber'
                    id='phonenumber'
                    placeholder='1234567890'
                    className='form-style'
                    {...register("phoneNo", {
                        required: {
                        value: true,
                        message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
                    })}
                />
             </div>
          </div>
          {
            errors.phoneNo && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.phoneNo.message}
                </span>
            )
          }
        </div>
        {/* message box */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='message' className="lable-style">Message</label>
            <textarea
                name='message'
                id='message'
                cols="30"
                rows="7"
                placeholder='Enter Your Message here'
                {...register("message",{required:true})}
                className='form-style'
            />
            {
            errors.message && (<span className="-mt-1 text-[12px] text-yellow-100">Enter the message</span>)
            }
        </div>   
       <button  disabled={loading} type='submit' className={`rounded-md bg-yellow-50 text-center px-6 py-3  text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}>
           Send Message
       </button>
    </form>
  )
}
export default ContactUsForm
