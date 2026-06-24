import React, { useRef, useState } from 'react'
import { useArtistStore } from '../../store/useArtistStore'

const UploadMusic = () => {
    const uploadMusic=useArtistStore((state)=>state.uploadMusic)
    const uploadingMusic=useArtistStore((state)=>state.uploadingMusic)
    const formRef=useRef(null)
    
    const [form ,setForm ]= useState({
        musicTitle:null,
        coverImage:null,
        musicFile:null,
    })
    const handleChange=(e)=>{
        const {name , value , type,files}=e.target
        

        setForm((prev)=>({
            ...prev,
            [name]:type==='file'? files[0]: value
        }))
        console.log(form)

    }


    const handleSubmit=async (e)=>{
        e.preventDefault()
        if (!form.musicTitle || !form.coverImage || !form.musicFile) {
        toast.error("Please fill out all fields!");
        return;
    }
        const formData=new FormData()
        formData.append('title',form.musicTitle)
        formData.append('image',form.coverImage)
        formData.append('music',form.musicFile)
        const sucessfullyUploaded=await uploadMusic(formData)
        if (sucessfullyUploaded) {
            setForm({
                musicTitle:"",
                coverImage:null,
                musicFile:null
            })
            if (formRef.current) {
                formRef.current.reset()
                
            }
        }


    }
  return (
    <div>
        <form ref={formRef} onSubmit={handleSubmit} className=' flex flex-col' >

            <label htmlFor="musicTitle">Enter The Title Of the Music</label>
            <input type="text"
             id='musicTitle'
             className=' bg-white text-black pl-2'
             onChange={handleChange}
             name='musicTitle' />

            <label htmlFor="coverImage">Upload the Cover Image</label>
            <input className='bg-white 
             text-black'
             onChange={handleChange}
             type="file" name='coverImage' id='coverImage'  />

            <label htmlFor="musicFile">Upload the Music File</label>
            <input className=' bg-white
                text-black'
                onChange={handleChange}
                type="file" name='musicFile' id='musicFile' />

            <button 
            disabled={uploadingMusic}
             type='submit'>
                {uploadingMusic? 'Uplaoding....':'Upload'}
            </button>
            


        </form>


    </div>
  )
}

export default UploadMusic