import React, { useState } from 'react'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { USER_API_END_POINT } from '@/utils/constant'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import { CreatePost } from './CreatePost'


export const LeftSidebar = () => {
    const [open, setOpen] = useState(false);
const {user} = useSelector(store=> store.auth);
const dispatch = useDispatch()
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            // console.log(res)
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
         toast.error(error?.response?.data?.message || "Something went wrong");

        }
    }
   

    const sidebarHandler = (textType) => {
        if (textType === "Logout") return logoutHandler();
  if (textType === "Home") navigate("/");
  if (textType === "Profile") navigate("/profile");
  if(textType === "Create") {
    setOpen(true)
  }
    }
    const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
        icon: (
            <Avatar className='w-6 h-6'>
                <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ),
        text: "Profile"
    },
    { icon: <LogOut />, text: "Logout" },
]
    return (
        <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[20%] h-screen'>
            <div>
                <h1>LOGO</h1>
                <div>
                    {
                        sidebarItems.map((item, index) => {
                            return (
                                <div key={index} onClick={() => sidebarHandler(item.text)}  className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer py-2 my-4 px-2 rounded-lg font-semibold'>
                                    {item.icon}
                                    <span>{item.text}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CreatePost open={open} setOpen={setOpen} />
        </div>
    )
}
