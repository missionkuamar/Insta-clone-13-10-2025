import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { DialogContent } from './ui/dialog'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { FaRegHeart } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { CommentDialog } from './CommentDialog'


export const Post = () => {
const [text, setText] = useState('');
const [open, setOpen] = useState('');
const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if(inputText.trim()){
        setText(inputText)
    } else {
        setText("");
    }
}

    const iconStyle = "w-6 h-6 cursor-pointer hover:text-gray-600";
  return (
    <div className='my-8 w-full max-w-sm mx-auto pl-4'>
        <div className='flex items-center justify-between'>
<div className='flex items-center gap-2'>
<Avatar>
    <AvatarImage src=""  alt="post_image"/>
    <AvatarFallback>CN</AvatarFallback>
</Avatar>
<h1>Username</h1>
</div>
<Dialog>
    <DialogTrigger asChild>
        <MoreHorizontal className='cursor-pointer' />
    </DialogTrigger>
    <DialogContent className="flex flex-col items-center text-sm text-center">
        <Button variant="ghost" className='cursor-pointer w-fit'>follow</Button>
        <Button variant="ghost" className='cursor-pointer w-fit'>Add to Favorites</Button>
        <Button variant="ghost" className='cursor-pointer w-fit'>Delete</Button>
    </DialogContent>
</Dialog>
        </div>
        <img
        className='rounded-sm my-2 w-full aspect-square object-cover'
         src='https://imgs.search.brave.com/NVCMFliuVM_OMYCHv7jOB9scMgePQYGOxVb5QTWpiEM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb250/ZW50LnBleGVscy5j/b20vaW1hZ2VzL2Nh/bnZhL2FpLWdlbmVy/YXRlZC1hZC9vZmYt/dGhlbWUvZmllcnlf/c3Vuc2V0X3NreV9z/d2lybGluZy1mdWxs/LmpwZw' alt='post_img'/>
         
        <div className="">
  <div className="flex items-center justify-between my-2 font-ex">

    <div className="flex items-center gap-3">
      <FaRegHeart className={iconStyle} />
<FiMessageCircle className={iconStyle} onClick={() => setOpen(true)} />
<IoMdSend className={iconStyle} />
    </div>

   <FaBookmark className={iconStyle} />

  </div>
  <span className='font-medium block mb-2'>1L like</span>
  <p>
    <span className='font-medium mr-2'>Username</span>
    Caption
  </p>
  <span onClick={() => setOpen(true)}>View all 10 Comments</span>
  <CommentDialog open={open} setOpen={setOpen} />
  <div className='flex items-center justify-between '>
    <input
    type='text'
    placeholder='add a comment'
    value={text}
    onChange={changeEventHandler}
    className='outline-none text-sm w-full' />
    {
      text &&   <span className='text-[#3BaDF8]'> Post </span>
    }
  </div>
</div>

    </div>
  )
}
