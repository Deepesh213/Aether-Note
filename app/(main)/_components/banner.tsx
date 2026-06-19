"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
};

export const Banner = ({
  documentId
}: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId })

    toast.promise(promise, {
      loading: "Deleting Page...",
      success: "Page deleted!",
      error: "Failed to delete Page."
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring Page...",
      success: "Page restored!",
      error: "Failed to restore Page."
    });
  };

  return (
    <div className="w-full bg-red-500 text-center text-sm p-2 text-white flex flex-col items-center gap-x-2 justify-center">
      <p className="pb-2">
        This page has been archived and is currently read-only
      </p>
      <div className="flex items-center gap-x-2 ">
        <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:cursor-pointer hover:bg-white p-1 px-2 h-auto font-normal"
        >
            Restore page
        </Button>
        <ConfirmModal onConfirm={onRemove}>
            <Button
            size="sm"
            variant="outline"
            className="border-white bg-transparent hover:bg-primary/5 text-white hover:cursor-pointer hover:bg-white p-1 px-2 h-auto font-normal"
            >
            Delete permanently
            </Button>
        </ConfirmModal>
      </div>
      
    </div>
  )
}