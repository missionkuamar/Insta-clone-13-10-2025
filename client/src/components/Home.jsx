import React from 'react'
import { Outlet } from 'react-router-dom'
import { Feed } from './Feed'
import { RightSidebar } from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUser'


export const Home = () => {
useGetAllPost();
useGetSuggestedUsers();
    return (
      <div className="flex">
            <div className="flex-grow">
                <Feed />
            </div>
            <RightSidebar />
        </div>
    )
}

