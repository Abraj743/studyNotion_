import React from 'react'
import {HomePageExplore} from "../../../data/homepage-explore";
import { useState } from 'react';
import HighlightText from './HighlightText';
import CourseCard from "../HomePage/CourseCard";
const tabsName=[
       "Free",
       "New to Coding",
       "Most Popular",
       "Skill Paths",
       "Career paths",
];
 const ExploreMore = () => {
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);
    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag===value);
        // why result[0] why 0
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };
  return (
    <div>
    {/* Explore More Section */}
        <div>
        <div className='text-4xl font-semibold text-center my-10'>Unlock the
           <HighlightText text={"Power of Code"}/>
           <p className='text-center text-richblack-300 text-lg font-semibold  mt-1'>Learn to build anything you can imagine</p>
         </div>
        </div>
         {/* Tabs Section */}
         <div className='lg:flex hidden gap-5 -mt-5 mx-auto w-max rounded-full bg-richblack-800 text-richblack-200  p-1 font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)'>
            {
                tabsName.map((element,index)=>{
                    return (
                        <div className={`text-[16px] flex items-center gap-2
                        ${currentTab===element
                        ?"bg-richblack-900 text-richblack-5  font-medium"
                        :"text-richblack-200"} px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 `} key={index} onClick={()=>setMyCards(element)}>
                            {element}
                        </div>
                    );
                })
            }
         </div>
            <div className='hidden lg:block lg:h-[200px]'>

            </div>
            {/* Cards Group */}
             <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:left-[50%]  lg:bottom-[0] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
             {
                courses.map((element,index) =>{
                    return (
                        <CourseCard key={index}  cardData={element}  currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                    );

                }) 
            } 
            </div>
    </div>
  );
};
export default ExploreMore;
