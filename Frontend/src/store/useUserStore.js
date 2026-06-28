import {create} from "zustand"
import { axiosInstance } from "../util/axiosInstance"
import toast from "react-hot-toast"
export const useUserStore=create((set)=>({

    musics:[],
    fetchingMusic:false,
    getAllMusics:async () => {
        set({fetchingMusic:true})
        try {
          const res=await   axiosInstance.get("/music/")
          set({musics:res.data.music})
          
         
            
        } catch (error) {
             const msg=error?.response?.data?.message||error?.message||"can't Fetch the Music" 
             toast.error(msg)
             set({musics:[]})
            
        }
        finally{
            set({fetchingMusic:false})
        }
        
    }





}))