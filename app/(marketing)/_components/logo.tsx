import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font=Poppins({
    subsets:["latin"],
    weight:["400","600"]
})

const Logo = () => {

    return ( 
        <div className="hidden md:flex items-center pag-x-2">
            <Image alt="logo" src='/black_logo.svg' width="40" height="40" className="dark:hidden"/>
            <Image alt="logo" src='/white_logo.svg' width="40" height="40" className="hidden dark:block"/>
            
        </div>
     );
}
 
export default Logo;