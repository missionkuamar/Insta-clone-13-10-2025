import React from 'react'
import { Post } from './Post'
import { useSelector } from 'react-redux'

export const Posts = () => {
  const {posts} = useSelector(store => store.post);
  return (
    <div className='w-[550px] h-[600px]'>
        {
          posts.map((post) => <Post key={post._id} post={post} />  )
        }
    </div>
  )
}
