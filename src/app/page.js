"use client";

import AnalyticsLook from '@/components/analyticslook/page';
import Body from '@/components/Body/page'
import Footer from '@/components/Footer/page'
import Hero from '@/components/Hero/page'
import Navbar from '@/components/Navbar/page'
import SmallBody from '@/components/SmallBody/Page'
import TaskLook from '@/components/TaskLook/page';
import React, { useEffect } from 'react'

const page = () => {

  const wakeupServer = async() => {
    const res = await fetch("/api/wakeserver");

    if(!res.ok){
      return;
    }
    const data = await res.json();
    console.log(data.message);
  }

  useEffect(() => {
    wakeupServer();
  },[]);
  return (
    <div>

      <Navbar/>
      <br/> <br/>
      <br/>
      <Hero/>
      <br/><br/><br/>
      <SmallBody/>
      <br/>
      <Body/>
      <br/>
      <TaskLook/>
      <br/>
      <AnalyticsLook/>
      <br/><br/><br/>
      <br/><br/><br/>
      <Footer/>
    </div>
  )
}

export default page
