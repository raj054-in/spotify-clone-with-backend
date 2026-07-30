import {create} from "zustand"
import { axiosInstance } from "../util/axiosInstance"
import toast from "react-hot-toast"
export const useUserStore=create((set,get)=>({

    musics:[],
    fetchingMusic:false,
    getAllMusics:async () => {
        set({fetchingMusic:true})
        try {
          const res=await   axiosInstance.get("/music/all-music")
          set({musics:res.data.music})
          
         
            
        } catch (error) {
             const msg=error?.response?.data?.message||error?.message||"can't Fetch the Music" 
             toast.error(msg)
             set({musics:[]})
            
        }
        finally{
            set({fetchingMusic:false})
        }
        
    },
    Albums:[],
    fetchingAlbum:false,
    getAllAlbum:async () => {
        set({fetchingAlbum:true})
        try {
            const res= await axiosInstance.get("/music/all-album")
            set({Albums:res.data.album})
            
            
            
        } catch (error) {
            const msg=error?.response?.data?.message||error?.message||"can't Fetch the Albums" 
            toast.error(msg)
            set({Albums:[]})
            
        }
        finally{
            set({fetchingAlbum:false})

        }

        
    },
    fetchingAlbumMusic:false,
    AlbumMusic:null,
    getAlbumsMusic:async (id) => {
        set({fetchingAlbumMusic:true})
        try {
            const res =await axiosInstance.get(`/music/album/${id}`)
            set({AlbumMusic:res.data.album})
            console.log(res)
        } catch (error) {
            const msg=error?.response?.data?.message||error?.message||"can't Fetch  Album Music" 
            toast.error(msg)
            set({AlbumMusic:null})
        }finally{
            set({fetchingAlbumMusic:false})
        }   
    },
    isAlbumTrack:false,
    isPlaying:false,
    currentTrack:null,
    isSelected:null,
    selectTrack:(song)=>{
        set({currentTrack:song,isPlaying:true})
    },
    nextTrack:()=>{
        const {currentTrack,musics}=get()
        if(musics.length==0||!currentTrack) return
        const currentIndex=musics.findIndex((track)=> track._id ===currentTrack._id)
        const nextTrack=(currentIndex+1)%musics.length
        set({currentTrack:musics[nextTrack],isPlaying:true})
        
    },
    prevTrack:()=>{
        const {currentTrack,musics}=get()
        if(musics.length==0||!currentTrack) return
        const currentIndex=musics.findIndex((track)=> track._id ===currentTrack._id)
        const prevTrack=(currentIndex-1+musics.length)%musics.length
        set({currentTrack:musics[prevTrack],isPlaying:true})
    },
    togglePlay:()=>{
        set((state)=>({isPlaying:!state.isPlaying}))
    }
}))