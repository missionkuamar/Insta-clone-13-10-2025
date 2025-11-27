import React from 'react'
import { Post } from './Post'

export const Posts = () => {
  return (
    <div className='w-[550px] h-[600px]'>
        {
            [1,2,3,4,5,6,7,8,9,10].map((item, index) => <Post key={index} item={item} />  )
        }
    </div>
  )
}
