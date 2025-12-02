import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Comment } from './Comment'
import axios from 'axios'
import { POST_API_END_POINT} from "@/utils/constant"
import { toast } from 'sonner'
import { setPosts } from '@/redux/postSlice'


export const CommentDialog = ({ open, setOpen }) => {
    const [text, setText] = useState("");
    const { selectedPost, posts } = useSelector(store => store.post);
    const [comment, setComment] = useState([]);
 
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }
   
  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost?.comments || []);
    }
  }, [selectedPost]);

    const sendMessageHandler = async () => {
        try {
            const res = await axios.post(`${POST_API_END_POINT}/${selectedPost?._id}/comment`, { text }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
               const updatedCommentData = [...comment, res.data.comment];
                 setComment(updatedCommentData);
                 
                 const updatedPostData = posts.map(p=>
                   p?._id === selectedPost?._id ? {...p, comments: updatedCommentData} : p
                 );
                 dispatch(setPosts(updatedPostData))
                toast.success(res.data.message)
                setText("")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                onInteractOutside={() => setOpen(false)}
                className="max-w-5xl p-0 flex flex-col"
            >
                <DialogTitle className="sr-only"></DialogTitle>
                <DialogDescription className="sr-only"></DialogDescription>
                <div className="flex flex-1">

                    {/* Left: Image */}
                    <div className="w-1/2">
                        <img
                            className="rounded-sm my-2 w-full aspect-square object-cover"
                            src={selectedPost?.image}
                            alt="post_img"
                        />
                    </div>

                    {/* Right: Comments */}
                    <div className="w-1/2 flex flex-col justify-between">

                        {/* Header */}
                        <div className="flex items-center justify-between py-3">
                            <div className="flex gap-3 items-center">
                                <Link>
                                    <Avatar>
                                        <AvatarImage src={selectedPost?.author?.profilePicture} alt="profile" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>

                                <Link className="font-extrabold text-sm">User name</Link>
                            </div>

                            {/* More options dialog */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className="cursor-pointer" />
                                </DialogTrigger>

                                <DialogContent className="flex flex-col items-center text-sm text-center">
                                    <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                                        Unfollow
                                    </div>
                                    <div className="cursor-pointer w-full">
                                        Add to favorites
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <hr />

                        {/* Comments section */}
                        <div className="flex-1 overflow-y-auto max-h-96 p-4">
                            {comment?.map((comment) => (
                                <Comment key={comment?._id} comment={comment} />
                            ))}

                        </div>

                        {/* Add comment */}
                        <div className="flex items-center gap-2 p-3">
                            <input
                                value={text}
                                onChange={changeEventHandler}
                                type="text"
                                placeholder="Add a comment..."
                                className="w-full outline-none border-gray-300 text-sm border rounded p-2"
                            />
                            <Button disabled={!text.trim()} variant="outline" onClick={sendMessageHandler}>Send</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
