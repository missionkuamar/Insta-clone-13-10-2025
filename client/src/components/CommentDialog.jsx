import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

export const CommentDialog = ({ open, setOpen }) => {
    const [text, setText] = useState("");

    const  changeEventHandler = (e) => {
        const inputText = e.target.value;
        if(inputText.trim()) {
            setText(inputText);
        } else{
setText("");
        }
        }
        const sendMessageHandler = async () => {
            alert(text)
        }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
                onInteractOutside={() => setOpen(false)}
                className="max-w-5xl p-0 flex flex-col"
            >
                <div className="flex flex-1">
                    
                    {/* Left: Image */}
                    <div className="w-1/2">
                        <img
                            className="rounded-sm my-2 w-full aspect-square object-cover"
                            src="https://imgs.search.brave.com/NVCMFliuVM_OMYCHv7jOB9scMgePQYGOxVb5QTWpiEM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb250/ZW50LnBleGVscy5j/b20vaW1hZ2VzL2Nh/bnZhL2FpLWdlbmVy/YXRlZC1hZC9vZmYt/dGhlbWUvZmllcnlf/c3Vuc2V0X3NreV9z/d2lybGluZy1mdWxs/LmpwZw"
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
                                        <AvatarImage src="" alt="profile" />
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
                            Comments ayega
                        </div>

                        {/* Add comment */}
                        <div className="flex items-center gap-2 p-3">
                            <input
                            value={text}
                            onChange={changeEventHandler}
                                type="text"
                                placeholder="Add a comment..."
                                className="w-full outline-none border-gray-300 border rounded p-2"
                            />
                            <Button disabled={!text.trim()} variant="outline" onClick={sendMessageHandler}>Send</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
