"use client";

import { useEffect, useState } from "react";
import { File, FileText } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";


import {
    Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);
    const [isMounted, setIsMounted] = useState(false);

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle]);

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose();
    };

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <Command>
                <CommandInput
                    placeholder={`Search ${user?.fullName}'s Aether...`}
                />
                <CommandList>
                    <CommandEmpty>No result found.</CommandEmpty>
                    <CommandGroup heading="Pages">
                        {documents?.map((document) => (
                        <CommandItem
                            key={document._id}
                            value={`${document._id}-${document.title}`}
                            title={document.title}
                            onSelect={() => onSelect(document._id)}
                        >
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">
                                    {document.icon}
                                </p>
                            ) : (
                                <FileText className="mr-2 h-4 w-4" />
                            )}
                            <span>
                                {document.title}
                            </span>
                        </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </CommandDialog>
    )
}