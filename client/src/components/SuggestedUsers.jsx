import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth || []);
    console.log("ye user profiel h ",suggestedUsers)
    return (
        <div>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for You </h1>
                <span className='font-medium cursor-pointer'>See All </span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div key={user?._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="Post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}></Link>{user?.username}
                                    
                                    </h1>
                                    <span className='text-gray-600 text-sm'>
                                        {user?.bio || 'Bio her...'}
                                    </span>
                                </div>
                            </div>
                            <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:tex-[#3495d6]'>follow</span>
                        </div>
                    )
                })
            }
        </div>
    )
}
