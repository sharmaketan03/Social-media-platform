import React from 'react'
import LeftBar from '../sidebarComponents/LeftBar'
import { Outlet } from 'react-router-dom'
function Home() {
  return (
      <>
      <div className='flex items-start mt-5'>
           <LeftBar/>
           <Outlet/>
      </div>
      
      </>
    
  )
}

export default Home