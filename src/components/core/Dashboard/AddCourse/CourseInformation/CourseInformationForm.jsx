import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from 'react-hook-form'
import { useState } from 'react';
import { useEffect } from 'react';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementField from './RequirementField';
import { setStep, setCourse} from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { toast } from 'react-hot-toast';
 const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
  }=useForm();
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);
  const {course,editCourse}=useSelector((state)=>state.course);
  const [loading,setLoading]=useState(false);
  const [courseCategories,setCourseCategories]=useState([]);
  useEffect(()=>{
    const getCategories=async() =>{
      setLoading(true);
      const categories=await fetchCourseCategories();
      if(categories.length>0)
      {
        setCourseCategories(categories);
      }
      setLoading(false);
    }
    if(editCourse){
      setValue("courseTitle",course.courseName);
      setValue("courseShortDesc",course.courseDescription);
      setValue("coursePrice",course.price);
      setValue("courseTags",course.tag);
      setValue("courseBenefits",course.whatYouWillLearn);
      setValue("courseCategory",course.category);
      setValue("courseRequirements",course.instructions);
      setValue("courseImage",course.thumbnail);
    }
    getCategories();
  },[])
  const isFormUpdated=()=>{
    const currentvalues=getValues();
    if(currentvalues.courseTitle !== course.courseName ||
      currentvalues.courseShortDesc !== course.courseShortDesc ||
      currentvalues.coursePrice !== course.price ||
      currentvalues.courseBenefits !== course.whatYouWillLearn ||
      currentvalues.courseCategory._id !== course.category._id ||
      currentvalues.courseRequirements.toString() !== course.instructions.toString()
      // currentvalues.courseTags.toString() !== course.tag.toString() ||
      // currentvalues.courseImage !== course.thumbnail 
     
      )
    return true;
    else
    return false;
  }
  const onSubmit=async(data)=>{
         if(editCourse)
         {
           if(isFormUpdated())
           {
            const currentValues=getValues();
           const formData=new FormData();
           formData.append("courseId",course._id);
           if(currentValues.courseTitle !== course.courseName)
           {
            formData.append("courseName",data.courseTitle);
           }
           if(currentValues.courseShortDesc !== course.courseDescription)
           {
            formData.append("courseDescription",data.courseShortDesc);
           }
           if(currentValues.coursePrice !== course.price)
           {
            formData.append("price",data.coursePrice);
           }
           if(currentValues.courseBenefits !== course.whatYouWillLearn)
           {
            formData.append("whatYouWillLearn",data.courseBenefits);
           }
           if(currentValues.courseCategory._id !== course.category._id)
           {
            formData.append("category",data.courseCategory);
           }
           if(currentValues.courseRequirements.toString() !== course.instructions.toString())
           {
            formData.append("instructions",JSON.stringify(data.courseRequirements));
           }
           setLoading(true);
           const result=await editCourseDetails(formData,token);
           setLoading(false);
           if(result)
           {
            dispatch(setStep(2));
            dispatch(setCourse(result));
           }
           }
           else
           {
            toast.error("No changes made to the form")
           }
           return ;
         }
        //  first time coming to make a course
        const formData=new FormData();
        formData.append("courseName",data.courseTitle);
        formData.append("courseDescription",data.courseShortDesc);
        formData.append("price",data.coursePrice);
        formData.append("whatYouWillLearn",data.courseBenefits);
        formData.append("category",data.courseCategory);
        formData.append("instructions",JSON.stringify(data.courseTitle));
        // formData.append("status".COURSE_STATUS.DRAFT)
         
        setLoading(true);
        const result=await addCourseDetails(formData,token);
        if(result)
        {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
        setLoading(false);

         
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
      <div>
        <label htmlFor='courseTitle'>Course Title<sup>*</sup></label>
        <input
          id='courseTitle'
          placeholder='Enter Course Title'
          {...register("courseTitle",{required:true})}
          className='w-full'
        />
        {
          errors.courseTitle && (
            <span>Course Title is Required**</span>
          )
        }
      </div>
      <div>
      <label htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
      <textarea
          id='courseShortDesc'
          placeholder='Enter Description'
          {...register("courseShortDesc",{required:true})}
          className='min-h-[140px] w-full'
        />
        {
          errors.courseShortDesc && (
            <span>Course Description is Required**</span>
          )
        }
      </div>
      <div className='relative'>
      <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
      <input
          id='coursePrice'
          placeholder='Enter Course Price'
          {...register("coursePrice",{
            required:true,
            valueAsNumber:true
            })}
          className='w-full'
        />
        <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400'/>
        {
          errors.coursePrice && (
            <span>Course Price is Required**</span>
          )
        }
      </div>
      <div>
        <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>
        <select
        id='courseCategory'
        defaultValue=""
        {...register("courseCategory",{required:true})}
        className='bg-richblack-400'
        >
           <option value="" disabled>Choose a Category</option>
           {
            !loading && courseCategories.map((category,index)=>(
              <option key={index} value={category?._id}>{category?.name}</option>
            ))
           }
        </select>
        {
          errors.courseCategory && (
            <span>Course Category is Required**</span>
          )
        }
      </div>
      {/* create a custom component for tag */}
      {/* create a component for uploading and showing preview of media */}
      <div>
        <label htmlFor='courseBenefits'>Benefits of the course<sup>*</sup></label>
        <textarea
          id='courseBenefits'
          placeholder='Enter Benefits of the course'
          {...register("courseBenefits",{required:true})}
          className='min-h-[140px] w-full'
        />
        {
          errors.courseBenefits && (
            <span>Course Benefits is Required**</span>
          )
        }
      </div>
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <div>
        {
          editCourse && (
            <button onClick={()=>dispatch(setStep(2))} className='flex item-center gap-x-2 bg-richblack-300'>Continue without Saving</button>
          )
        }
        <IconBtn
          text={!editCourse ? "Next" : "Save Changes"}
        />
      </div>
    </form>
  )
}
export default CourseInformationForm
