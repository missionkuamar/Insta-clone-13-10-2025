import React from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from './ui/avatar'

export const CommentDialog = ({ open, setOpen}) => {
  return (
    <div>
        <Dialog open={open}>

            <DialogContent onInteractOutside={() => setOpen(false)} className='max-w-5xl p-0 flex flex-col'>
        <div className='flex flex-1'>
               <div className='w-1/2'>
                  <img
        className='rounded-sm my-2 w-full aspect-square object-cover'
         src='https://imgs.search.brave.com/NVCMFliuVM_OMYCHv7jOB9scMgePQYGOxVb5QTWpiEM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb250/ZW50LnBleGVscy5j/b20vaW1hZ2VzL2Nh/bnZhL2FpLWdlbmVy/YXRlZC1hZC9vZmYt/dGhlbWUvZmllcnlf/c3Vuc2V0X3NreV9z/d2lybGluZy1mdWxs/LmpwZw' alt='post_img' />
               </div>
               <div className='w-1/2 flex flex-col justify-between'>
                <div className='flex items-center justify-between'>
<Link>
    <Avatar>
        <AvatarImage src=""  alt="post_image"/>
        <AvatarFallback>CN</AvatarFallback>
    </Avatar>
</Link>
<div>
    <Link>
        
    </Link>
</div>
                </div>
               </div>
        </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}
