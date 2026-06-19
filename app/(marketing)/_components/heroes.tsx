import Image from "next/image"

export const Heroes = () => {
    return ( 
        <div className="flex flex-col items-center justify-center max-w-5xl ">
                <div className="flex items-center">
                    <div className = "relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                        <Image
                            src="/document-dark.png"
                            fill
                            className = "object-contain hidden dark:block"
                            alt ="Documents"
                        />
                        <Image
                            src="/document-light.png"
                            fill
                            className = "object-contain dark:hidden"
                            alt ="Documents"
                        />
                    </div>
                    
                    <div className = "relative hidden md:block md:w-[400px] md:h-[400px]">
                        <Image
                            src="/reading-dark.png"
                            fill
                            className = "object-contain hidden dark:block"
                            alt ="Documents"
                            sizes="400px"
                        />
                        <Image
                            src="/reading-light.png"
                            fill
                            className = "object-contain dark:hidden"
                            alt ="Documents"
                            sizes="400px"
                        />
                    </div>
                </div>
        </div>
     );
}