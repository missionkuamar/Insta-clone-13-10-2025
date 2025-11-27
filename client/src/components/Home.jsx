import React from 'react'
import { Outlet } from 'react-router-dom'
import { Feed } from './Feed'
import { RightSidebar } from './RightSidebar'


export const Home = () => {

    return (
      <div className="flex">
            <div className="flex-grow">
                <Feed />
            </div>
            <RightSidebar />
        </div>
    )
}

