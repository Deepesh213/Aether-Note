"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
    return ( 
        <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your workflow, unified in one fluid workspace <span className="underline italic">Aether Note</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium ">
                A minimalist workspace that adapts to you.<br/> Build flexible layouts, nest pages endlessly, and organize your thoughts without constraints
            </h3>
            <AuthLoading>
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg"/>
                </div>
            </AuthLoading>
            <Authenticated>
                <Button asChild>
                    <Link href="/documents">
                        Start Writing
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Link>
                </Button>
            </Authenticated>
            
            <Unauthenticated>
                <SignInButton mode="modal" forceRedirectUrl="/documents">
                    <Button>
                    Start for Free
                    <ArrowRight className="h-4 w-4 ml-2"/>
                </Button>
                </SignInButton>
            </Unauthenticated>
        </div>
     );
}