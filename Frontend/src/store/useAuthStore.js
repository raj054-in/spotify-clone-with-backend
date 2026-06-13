import {create} from 'zustand'
import { axiosInstance } from '../util/axiosInstance';
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    signUp: async(form) => {
        set({isSigningUp:true})
        try {
            const res= await axiosInstance.post('/auth/register',form)
            const user= res.data.user??res.data
            set({authUser:user}) 
            toast.success("Sucessfully Signed Up")
        } catch (error) {
            set({authUser:null})
            const msg=error?.response?.data?.message||error?.message||"SignUp Failed"
            toast.error(msg)
        }finally{
            set({isSigningUp:false})
        }
    },
    isLoggingIn:false,
    logIn:async (form) => {
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post('/auth/login',form)
            const user =res.data.user?? res.data
            set({authUser:user})
            toast.success("Logged In")
        } catch (error) {
            set({authUser:null})
            const msg =error?.response?.data?.message||error?.message||"LogIn Failed"
            toast.error(msg)
        }
        finally{
            set({isLoggingIn:false})
        }
        
    },
    isCheckingAuth:false,
    checkAuth:async (token) => {
        
    }
}));