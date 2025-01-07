"use client"

import ConfirmModal from "@/components/modals/confirm-modal";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery,useMutation } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams,useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const TrashBox = () => {
    const router=useRouter()
    const params=useParams()
    const doucments=useQuery(api.documents.GetArchive)
    const restore = useMutation(api.documents.restore)
    const remove = useMutation(api.documents.remove)

    const [search,setSearch]=useState('')

    const filterDocuments =  doucments?.filter((doc)=>{
        return doc.title.toLowerCase().includes(search.toLowerCase())
    });

    const OnClick=(documentId:string)=>{
        router.push(`/documents/${documentId}`)
    }

    const onRestore = (event:React.MouseEvent<HTMLDivElement,MouseEvent>,
        documentId:Id<"documents">)=>{
            event.stopPropagation();
            const promise= restore({id:documentId});
            toast.promise(promise,{
                loading:"Restoring ...",
                success:"Note Restored!",
                error:"Failed to restore!"
            })
    }

    const onRemove = (documentId:Id<"documents">)=>{
        const promise= remove({id:documentId});
        toast.promise(promise,{
            loading:"Deleting Note ...",
            success:"Note Deleting!",
            error:"Failed to Delete!"
        })
    }
    
    // if(params.documentId=== doucments._id){
    // router.push("/doucments")
    // }

    if(doucments === undefined){
        return(
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size='lg'/>
            </div>
        )
    }



    return ( 
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4"/>
                <Input
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                placeholder="Filter by note title"
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden  last:block text-xs text-center text-muted-foreground pb-2">
                    No Document Found...
                </p>
                {filterDocuments?.map((document)=>(
                    <div key={document._id}
                    role="button" 
                    onClick={()=>OnClick(document._id)}
                    className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between">
                        <span className="truncate pl-2">
                            {document.title}
                        </span>
                        <div className="flex items-center">
                            <div className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                            role="button"
                            onClick={(e)=>onRestore(e,document._id)}>
                                <Undo className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            <ConfirmModal onConfirm={()=>onRemove(document._id)}>
                                <div className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
                                    <Trash className="h-4 w-4 text-muted-foreground"/>
                                </div>
                            </ConfirmModal>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
};