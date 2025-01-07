"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

//! sonner import for notifications
import { toast } from "sonner";

//! convex import 
import  {useMutation} from "convex/react"
import {api} from "@/convex/_generated/api";
import { useRouter } from "next/navigation";


const DocumentPage = () => {
    const router= useRouter()
    const {user}=useUser()
    const create=useMutation(api.documents.create)

    const onCreate=()=>{
        const promise = create({title:"Untitled Document"})
        .then((documentId) => router.push(`/documents/${documentId}`))

        toast.promise(promise,{
            loading:"Creating New Note Document...",
            success:"New Note Created !",
            error:"Failed To Create New Note Document"
        })
        
    }


    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image src='/black_logo.svg'
            alt='no data' width="300" height="300"
            className="dark:hidden"/>
            <Image src='/white_logo.svg'
            alt='no data' width="300" height="300"
            className="hidden dark:block"/>
            <h2 className="text-lg font-medium">Welcom to {user?.firstName}&apos; Noter</h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Create a note
            </Button>
        </div>
     );
}
 
export default DocumentPage;