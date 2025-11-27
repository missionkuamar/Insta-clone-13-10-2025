import React from 'react'
import { Outlet } from 'react-router-dom'
import { LeftSidebar } from './LeftSidebar'


export const MainLayout = () => {
  return (
     <div className='flex'>
      <LeftSidebar /> 
      <div className='flex flex-grow ml-[20%]'>
          <Outlet />
      </div>
    </div>
  )
}

