import React, { useRef, useState } from 'react'
import { useArtistStore } from '../../store/useArtistStore'
import { toast } from 'react-hot-toast' // Make sure toast is imported!

const UploadMusic = () => {
    const uploadMusic = useArtistStore((state) => state.uploadMusic)
    const uploadingMusic = useArtistStore((state) => state.uploadingMusic)
    const formRef = useRef(null)
    
    const [form, setForm] = useState({
        musicTitle: "",
        coverImage: null,
        musicFile: null,
    })

    const handleChange = (e) => {
        const { name, value, type, files } = e.target
        
        setForm((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.musicTitle || !form.coverImage || !form.musicFile) {
            toast.error("Please fill out all fields!");
            return;
        }
        
        const formData = new FormData()
        formData.append('title', form.musicTitle)
        formData.append('image', form.coverImage)
        formData.append('music', form.musicFile)
        
        const successfullyUploaded = await uploadMusic(formData)
        if (successfullyUploaded) {
            setForm({
                musicTitle: "",
                coverImage: null,
                musicFile: null
            })
            if (formRef.current) {
                formRef.current.reset()
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md bg-[#181818] rounded-lg p-8 shadow-2xl border border-zinc-800/50">
                
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Upload Your Music</h2>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">Artist Dashboard</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    
                    {/* Music Title Input */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="musicTitle" className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                            Track Title
                        </label>
                        <input 
                            type="text"
                            id="musicTitle"
                            name="musicTitle"
                            value={form.musicTitle}
                            onChange={handleChange}
                            placeholder="What's the name of your track?"
                            className="w-full bg-[#282828] text-white text-sm placeholder-zinc-500 rounded-md p-3 border border-transparent focus:outline-none focus:border-zinc-500 focus:bg-[#3e3e3e] transition duration-200"
                        />
                    </div>

                    {/* Cover Image Input */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="coverImage" className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                            Cover Artwork
                        </label>
                        <input 
                            type="file" 
                            name="coverImage" 
                            id="coverImage"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full text-xs text-zinc-400 bg-[#282828] rounded-md p-2 border border-transparent focus:outline-none focus:border-zinc-500 cursor-pointer
                                       file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white file:text-black hover:file:bg-zinc-200 transition file:cursor-pointer"
                        />
                    </div>

                    {/* Music File Input */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="musicFile" className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                            Audio File
                        </label>
                        <input 
                            type="file" 
                            name="musicFile" 
                            id="musicFile"
                            accept="audio/*"
                            onChange={handleChange}
                            className="w-full text-xs text-zinc-400 bg-[#282828] rounded-md p-2 border border-transparent focus:outline-none focus:border-zinc-500 cursor-pointer
                                       file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white file:text-black hover:file:bg-zinc-200 transition file:cursor-pointer"
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        disabled={uploadingMusic}
                        type="submit"
                        className="w-full bg-white text-black font-bold py-3.5 px-6 rounded-full mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed text-sm uppercase tracking-wider shadow-md"
                    >
                        {uploadingMusic ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                Uploading...
                            </span>
                        ) : 'Publish Track'}
                    </button>
                    
                </form>
            </div>
        </div>
    )
}

export default UploadMusic