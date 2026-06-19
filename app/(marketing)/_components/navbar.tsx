"use client"

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

import { Authenticated, Unauthenticated, useConvexAuth, AuthLoading } from "convex/react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";


export const Navbar = () => {
  // const {isAuthenticated, isLoading} = useConvexAuth();
  const scrolled = useScrollTop();
  return ( 
      <div className = {cn("z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#0D0D0D]" 
        , scrolled && "border-b shadow-sm"
        )}>
        <Logo/>
        <div className="justify-between w-full flex items-center gap-x-2 md:justify-end md:ml-auto">
          <AuthLoading>
            <Spinner />
          </AuthLoading>
          <Unauthenticated>
            <SignInButton mode="modal">
                <Button variant = "ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">
                  Start Free
                </Button>
              </SignInButton>
          </Unauthenticated>
          {/* {!isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal">
                <Button variant = "ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">
                  Start Free
                </Button>
              </SignInButton>
            </>
           )} */}
           <Authenticated>
              <Button variant = "ghost" size="sm" asChild>
                <Link href = "/documents">
                  Enter Aether
                </Link>
              </Button>
              <UserButton/>
           </Authenticated>
           {/* {isAuthenticated && !isLoading &&(
              <>
                <Button variant = "ghost" size="sm">
                  <Link href = "/documents">
                    Enter Aether
                  </Link>
                </Button>
                <UserButton/>
              </>
           )
           } */}
          <ModeToggle/>
        </div>
        
      </div>
    );
}