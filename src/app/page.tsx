// 'use client'

import SocialMediaLinks from "@/components/SocialMediaLinks";
import DownButton from "@/assets/DownButton.svg";
import CustomCursor from "@/components/CustomCursor";


// import React, { useRef, useEffect, useState } from 'react';


export default function Home() {

  // const revealLayerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="div h-full w-full flex">
      <div className="reveal-layer absolute h-full w-full"><p>hi</p></div>
      <SocialMediaLinks />
      <img src={DownButton.src} className="h-20" />
      <CustomCursor />
    </div>
  );
}
