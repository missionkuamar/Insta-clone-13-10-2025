import React from 'react'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { USER_API_END_POINT } from '@/utils/constant'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

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
                <AvatarImage src="https://imgs.search.brave.com/ck2NiSFeoV7PsstmVzhzV9dgsqk8RYo10azpHFoacGw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9kcmFn/b24taGVhZC00Mzcz/ODQ5LmpwZw" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ),
        text: "Profile"
    },
    { icon: <LogOut />, text: "Logout" },
]
export const LeftSidebar = () => {

    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            // console.log(res)
            if (res.data.success) {
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
    }
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
        </div>
    )
}
