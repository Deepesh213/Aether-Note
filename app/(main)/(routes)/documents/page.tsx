'use client';

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

const DocumentsPage = () => {
    const {user} = useUser();
    const create = useMutation(api.documents.create);
    const router = useRouter();

    const onCreate = () => {
        const promise = create({title:"Untitled"})
            .then((documentId) => router.push(`/documents/${documentId}`));

        toast.promise(promise , {
            loading: "Drafting a new page...",
            success: "New Note created",
            error: "Failed to initialize page"
        })
    }

    return ( 

        <div className="h-full flex flex-col items-center justify-center space-y-4">   
            <Image 
                src="/empty-light.png"
                height="300"
                width="300"
                alt="Empty"
                className="dark:hidden"
            />
            <Image 
                src="/empty-dark.png"
                height="300"
                width="300"
                alt="Empty"
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">
                {user?.firstName}, Your digital canvas is ready
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Create a note
            </Button>
        </div>
    );
}
 
export default DocumentsPage;