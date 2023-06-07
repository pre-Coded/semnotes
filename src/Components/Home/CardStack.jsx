import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";

export default function App() {

  const cardStyle = "p-2 rounded-md shadow-md flex flex-col item-center"

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper h-[50%] md:w-96 w-[90%] text-sm"
        touchEventsTarget="wrapper"
        direction="horizontal"
      >
        <SwiperSlide className=" h-full w-full flex flex-col justify-start items-center bg-main space-y-3 rounded-lg shadow-lg relative">
          <span></span>
          <span className="main-text neumorphic px-10 py-3
          ">Problem</span>
          <span className="para-text p-2 tracking-wider flex items-center justify-center">
            Are you feeling overwhelmed and concerned about the time-consuming process of searching for the best reference notes, syllabus, previous year papers, and a suitable YouTube playlist for an upcoming exam? Do you worry that this search might be taking away valuable time that could be better utilized for preparation? We understand your concerns and are here to help!
          </span>
        </SwiperSlide>
        <SwiperSlide className="w-full flex flex-col items-center bg-main space-y-3 rounded-lg shadow-lg">
          <span></span>
          <span className="main-text neumorphic px-10 py-3">Solution</span>
          <span className="para-text p-2 tracking-wider relative flex flex-col space-y-3">
          <span>
          We through ExamRescue aim to assist you in finding the most relevant and reliable study resources efficiently. By understanding your requirements and preferences, we can provide tailored recommendations for reference notes, syllabus, previous year papers, and YouTube playlists related to your subject of interest. This way, you can save time and focus more on your exam preparation.
          </span>
          <button className="bg-main rounded-md shadow-md p-3 text-main flex items-center justify-center space-x-4 tracking-wider">
            <AiOutlineArrowLeft/>
            Slide to know How!
          </button>
          </span>
        </SwiperSlide>
        <SwiperSlide className="w-full flex flex-col items-center bg-main space-y-3 rounded-lg shadow-lg">
          <span></span>
          <span className="main-text neumorphic px-10 py-3">How ?</span>
          <span className="para-text p-2 hide-scrollbar tracking-wider relative flex flex-col space-y-3">
          <span className="flex flex-col items-center justify-center">
              <span className="main-text bg-main shadow-md rounded-md p-2">Step 1 : </span>
              <span className="para-text text-center tracking-wider">
                Choose the second icon from navbar
              </span>
          </span>

            <span className="flex flex-col items-center justify-center">
              <span className="main-text bg-main shadow-md rounded-md p-2">Step 2 : </span>
              <span className="para-text text-center tracking-wider">
                You will have your branch and sem details.
                Select the subject.And there you have it.
              </span>
            </span>
          </span>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
