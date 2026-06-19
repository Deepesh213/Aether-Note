"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../upload/single-image";
import { UploaderProvider, UploadFn } from "../upload/uploader-provider";
import React from "react";

export const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  }

  // const onChange = async (file?: File) => {
  //   if (file) {
  //     setIsSubmitting(true);
  //     setFile(file);

  //     const res = await edgestore.publicFiles.upload({
  //       file,
  //       options: {
  //         replaceTargetUrl: coverImage.url
  //       }
  //     });

  //     await update({
  //       id: params.documentId as Id<"documents">,
  //       coverImage: res.url
  //     });

  //     onClose();
  //   }
  // }
  const uploadFn: UploadFn = React.useCallback(
    async ({ file }) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);
            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url,
                },
            });
            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            });

            onClose();
            return {
              url: res.url
            };
        }
        else throw new Error("No file provided");
    },
    [edgestore,coverImage.url, update, params.documentId,onClose],
  );

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Cover Image
            </DialogTitle>
        </DialogHeader>
        <UploaderProvider uploadFn={uploadFn} autoUpload>
            <SingleImageDropzone
                height={200}
                width={200}
                className="w-full outline-none"
                disabled={isSubmitting}
                // onChange={
                //   (e) => {
                //     onChange(e.target.files?.[0]);
                //   }
                //           }
                dropzoneOptions={{
                    maxSize: 1024 * 1024 * 1, // 1 MB
                }}
            />
        </UploaderProvider>
      </DialogContent>
    </Dialog>
  );
};