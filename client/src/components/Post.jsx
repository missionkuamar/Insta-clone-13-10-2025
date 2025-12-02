import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { DialogContent, DialogDescription, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { FiMessageCircle } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { CommentDialog } from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import {POST_API_END_POINT} from "@/utils/constant"
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Badge } from './ui/badge'

export const Post = ({post}) => {
const [text, setText] = useState('');
const [open, setOpen] = useState(false);
const [postLike, setPostLike] = useState(post?.likes?.length)
const {user} = useSelector(store => store.auth);
const {posts } = useSelector(store => store.post);
 const [liked, setLiked ] = useState(post?.likes?.includes(user?._id) || false)
 const [comment, setComment] = useState(post.comments);
const dispatch = useDispatch();

const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if(inputText.trim()){
        setText(inputText)
    } else {
        setText("");
    }
}

const commentHandler = async () => {
  try {
const res = await axios.post(`${POST_API_END_POINT}/${post?._id}/comment`, {text},{
  headers:{
    "Content-Type" : "application/json"
  },
  withCredentials: true
});
if(res.data.success)
{
  const updatedCommentData = [...comment, res.data.comment];
  setComment(updatedCommentData);
  
  const updatedPostData = posts.map(p=>
    p?._id === post?._id ? {...p, comments: updatedCommentData} : p
  );
  dispatch(setPosts(updatedPostData))
  toast.success(res.data.message)
  setText("")
}  }catch(error){
    console.log(error)
  }
}

const likeOrDislikeHandler = async () => {
    try {
const action = liked ? "dislike": 'like'
const res = await axios.get(`${POST_API_END_POINT}/${post?._id}/${action}`, {withCredentials: true})
if(res.data.success){
  const updatedLikes = liked ? postLike -1 : postLike + 1;
 setPostLike(updatedLikes);
  setLiked(!liked);
  // apne post ko updata krna
  const updatedPostData = posts.map(p =>
    p?._id === post._id ? {
      ...p,
      likes: liked ? p.likes?.filter(id => id === user._id) : [...p.likes, user._id]
    } : p
  
  )
  dispatch(setPosts(updatedPostData));
    toast.success(res.data.message);
    setLiked(!liked);
}
    } catch(error){
        console.log(error);
    }
}


const deletePostHandler = async () => {
  try {
     const res = await axios.delete(`${POST_API_END_POINT}/delete/${post?._id}`, {withCredentials: true})
if(res.data.success){
  const updataPostData = posts.filter((postItem) => postItem?._id !== post?._id);
  dispatch(setPosts(updataPostData));
  toast.success(res.data.message);
}
  } catch(error) {
    console.log(error)
    toast.error(error.response.data.message);
  }
}

    const iconStyle = "w-6 h-6 cursor-pointer hover:text-gray-600";
  return (
    <div className='my-8 w-full max-w-sm mx-auto pl-4'>
        <div className='flex items-center justify-between'>
<div className='flex items-center gap-2 hover:cursor-pointer'>
<Avatar>
    <AvatarImage src={post?.author?.profilePicture}  alt="post_image"/>
    <AvatarFallback>CN</AvatarFallback>
</Avatar>
<h1>{post?.author?.username}</h1>
{
  user?._id === post?.author?._id && <Badge variant="secondary">Author</Badge>
}
</div>
<Dialog>
    <DialogTrigger asChild>
        <MoreHorizontal className='cursor-pointer' />
    </DialogTrigger>
    <DialogContent className="flex flex-col items-center text-sm text-center">
    
  <DialogTitle className="sr-only">Post options</DialogTitle>
  <DialogDescription className="sr-only">Actions for this post</DialogDescription>
        <Button variant="ghost" className='cursor-pointer w-fit'>follow</Button>
        <Button variant="ghost" className='cursor-pointer w-fit'>Add to Favorites</Button>
        {
          user && user?._id === post?.author?._id  && <Button  onClick={deletePostHandler} variant="ghost" className='cursor-pointer w-fit'>Delete</Button>
        }
    </DialogContent>
</Dialog>
        </div>
        <img
        className='rounded-sm my-2 w-full aspect-square object-cover'
         src={post?.image} alt='post_img'/>
         
        <div className="">
  <div className="flex items-center justify-between my-2 font-ex">

    <div className="flex items-center gap-3">
      {
  liked ? (
    <FaHeart 
      className="w-6 h-6 cursor-pointer text-red-500" 
      onClick={likeOrDislikeHandler}
    />
  ) : (
    <FaRegHeart 
      className="w-6 h-6 cursor-pointer text-gray-700 hover:text-gray-500" 
      onClick={likeOrDislikeHandler}
    />
  )
}


<FiMessageCircle className={iconStyle} onClick={() => {dispatch(setSelectedPost(post));
  setOpen(true)}} />
<IoMdSend className={iconStyle} />
    </div>

   <FaBookmark className={iconStyle} />

  </div>
  <span className='font-medium block mb-2'>{postLike}Like</span>
  <p>
    <span className='font-medium mr-2'>{post?.author?.username}</span>
    {post?.caption}
  </p>
 {
  comment.length > 0 && (
     <span onClick={() => {dispatch(setSelectedPost(post));
  setOpen(true)}} className='text-gray-500 font-semibold hover:cursor-pointer'>View all {post?.comments?.length} Comments</span>
  )
 }
  <CommentDialog open={open} setOpen={setOpen} />
  <div className='flex items-center justify-between '>
    <input
    type='text'
    placeholder='add a comment'
    value={text}
    onChange={changeEventHandler}
    className='outline-none text-sm w-full' />
    {
      text &&   <span className='text-[#3BaDF8] hover:cursor-pointer' onClick={commentHandler}> Post </span>
    }
  </div>
</div>

    </div>
  )
}
