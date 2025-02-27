// 'use client'

import SocialMediaLinks from "@/components/SocialMediaLinks";
import DownButton from "@/assets/DownButton.svg";
import CustomCursor from "@/components/CustomCursor";
import BlurryMovingBlobs from "@/components/BlurryMovingBlobs";


// import React, { useRef, useEffect, useState } from 'react';


export default function Home() {

  return (
    <div className="h-screen w-full grid-overlap-container">
      <CustomCursor />
      <div className="custom-cursor-reveal-layer h-full w-full z-20 grid-overlap-container grid-overlap-element">
        <BlurryMovingBlobs className="bg-darkest-purple grid-overlap-element"/>
        <div className="h-screen w-full px-[15%] grid-overlap-element">
          hi from masked overlapper
        </div>
      </div>
      <div className="main-content-layer h-full w-full z-10 px-[15%] grid-overlap-element">
        <SocialMediaLinks />
        hi from non-overlapper!
      </div>
      <img src={DownButton.src} className="h-20" />
    </div>
  );
}
