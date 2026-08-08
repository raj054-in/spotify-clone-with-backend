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
    setAlbumMode: () => set({ isAlbumTrack: true }),
    setMusicMode: () => set({ isAlbumTrack: false }),
    isPlaying:false,
    currentTrack:null,
    isSelected:null,
    selectTrack:(song)=>{
        set({currentTrack:song,isPlaying:true})
    },
    nextTrack:()=>{
        const {currentTrack,musics,isAlbumTrack,AlbumMusic}=get()
        const queue=isAlbumTrack ?(AlbumMusic?.musics??[]):musics
        if (!currentTrack || queue.length === 0) return

        const currentIndex = queue.findIndex((track) => track._id === currentTrack._id)
        const nextIndex = (currentIndex + 1) % queue.length
        set({ currentTrack: queue[nextIndex], isPlaying: true })
    },
    prevTrack:()=>{
        const {currentTrack,musics,isAlbumTrack,AlbumMusic}=get()
        const queue=isAlbumTrack ?(AlbumMusic?.musics??[]):musics
         if (!currentTrack || queue.length === 0) return
        const currentIndex=queue.findIndex((track)=> track._id ===currentTrack._id)
        const prevTrack=(currentIndex-1+queue.length)%queue.length
        set({currentTrack:queue[prevTrack],isPlaying:true})
    },
    togglePlay:()=>{
        set((state)=>({isPlaying:!state.isPlaying}))
    }
}))