import Body from '@/components/Body/page'
import Hero from '@/components/Hero/page'
import Navbar from '@/components/Navbar/page'
import SmallBody from '@/components/SmallBody/Page'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <br/>
      <Hero/>
      <br/><br/><br/>
      <SmallBody/>
      <Body/>
    </div>
  )
}

export default page
