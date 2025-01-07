"use client"

import {useConvexAuth} from "convex/react"
import Link from "next/link";
import {SignInButton,UserButton} from "@clerk/clerk-react"

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";
import Logo from "./_components/logo";
import { cn } from "@/lib/utils";

const NavBarPage = () => {
    const scrolled=useScrollTop()

    const {isAuthenticated,isLoading} = useConvexAuth()

    return ( 
        <div className={cn(
            "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-md"
        )}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 ">
                {isLoading && (
                    <Spinner/>
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">Login</Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">Get Noter free</Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated  && !isLoading && (
                    <>
                        <Button variant='ghost' size='sm' asChild>
                            <Link href='/documents'>
                                Enter Noter
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/"/>
                    </>
                )}
                <ModeToggle/>
            </div>
        </div>
     );
}
 
export default NavBarPage;