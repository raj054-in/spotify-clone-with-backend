import { create  } from 'zustand';
export const useSearchStore=create((set)=>({
    searchQuery:null,
    search:async () => {

        
    },
    searchResult:null

}))