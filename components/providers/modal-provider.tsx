"use client"

import { useEffect,useState } from "react"
import { SettingModel } from "@/components/modals/settings-modal"
import { CoverImageModal } from "@/components/modals/cover-image-modal"

export const ModalProvider=()=>{
    const [isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    
    return(
        <>
            <SettingModel/>
            <CoverImageModal/>
        </>
    )
}