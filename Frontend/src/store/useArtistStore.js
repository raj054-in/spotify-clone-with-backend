
import {create} from 'zustand'
import { axiosInstance } from '../util/axiosInstance';
import toast from 'react-hot-toast';
export const useArtistStore=create((set)=>({
    uploadingMusic:false,
    uploadMusic:async (form) => {
        set({uploadingMusic:true})
        try {
            const res=await axiosInstance.post('/music/upload',form,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                // 1 minute timeout just for this heavy file upload
                timeout: 60000 
            })
            toast.success(res.data.message)
            return true

            
        } catch (error) {
            const msg=error?.response?.data?.message||error?.message||"Adding Music Failed"
            toast.error(msg)
            return false
            
        }finally{
            set({uploadingMusic:false})
        }
        
    }

}))