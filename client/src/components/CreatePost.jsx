import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { readFileAsDataURL } from '../lib/utils'   // <-- Make sure path is correct
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { POST_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '@/redux/postSlice'
export const CreatePost = ({ open, setOpen }) => {
    const imageRef = useRef();
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post)
   
    const dispatch = useDispatch();
    const filechangeHander = async (e) => {
        const f = e.target.files?.[0];
        if (f) {
            setFile(f);
            const dataUrl = await readFileAsDataURL(f);
            setImagePreview(dataUrl);
        }
    };

    const createPostHandler = async (e) => {
        e.preventDefault(); // fixed typo
        try {
            // console.log(file, caption)
            if (!file) {
                toast.error("Please select an image");
                return;
            }
            setLoading(true)
            const formData = new FormData();
            formData.append("caption", caption);
            if (imagePreview) formData.append("image", file);
            const res = await axios.post(`${POST_API_END_POINT}/addpost`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                withCredentials: true
            });
            console.log(res)
            if (res.data.success) {
                dispatch(setPosts([res.data.post, ...posts]));
                toast.success(res?.data?.message)
                setOpen(false)
                setCaption("");
                setFile(null);
                setImagePreview("");
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }


    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="text-center font-semibold">
                    <DialogTitle className="font-semibold">
                        Create New Post
                    </DialogTitle>
                </DialogHeader>

                {/* User info */}
                <div className="flex gap-3 items-center mb-3">
                    <Avatar>
                        <AvatarImage src={user?.profilePicture} alt="img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div>
                        <h1 className="font-semibold text-xs">{user?.username}</h1>
                        <span className="text-gray-600 text-xs">{user?.bio}</span>
                    </div>
                </div>

                {/* Caption */}
                <Textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="focus-visible:ring-transparent border-none"
                    placeholder="Write a caption...."
                />

                {/* Hidden input */}
                <input
                    ref={imageRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={filechangeHander}
                />

                {/* Preview */}
                {imagePreview && (
                    <div className="w-full h-64 flex items-center justify-center mt-3">
                        <img
                            src={imagePreview}
                            alt="preview_img"
                            className="h-full object-contain rounded-md"
                        />
                    </div>
                )}

                {/* Select Image */}
                <Button
                    onClick={() => imageRef.current.click()}
                    className="w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf]"
                >
                    Select from Computer
                </Button>

                {/* Create Post */}
                {
                    imagePreview && (
                        loading ? (
                            <Button>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                onClick={createPostHandler}
                                className="w-full mt-2 bg-[#3897F0] hover:bg-[#2588d4]"
                            >
                                Post
                            </Button>
                        )
                    )

                }
            </DialogContent>
        </Dialog>
    );
};
