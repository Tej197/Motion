"use client"

import { 
    AlertDialog,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../ui/alert-dialog";

interface ConfirModalProps{
    children:React.ReactNode,
    onConfirm:()=>void;
}

const ConfirmModal = ({children,onConfirm}:ConfirModalProps) => {

    const handleConfirm=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        event.stopPropagation()
        onConfirm();   
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={(event)=>event.stopPropagation()}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are You Sure?🤔
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action Not undone🫣
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e)=>e.stopPropagation()}>
                        Cancle
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
     );
}
 
export default ConfirmModal;