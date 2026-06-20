"use client";

import { useTheme } from "next-themes";
import React from "react";

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";

import { BlockNoteView  } from "@blocknote/mantine";

import { FormattingToolbar ,useCreateBlockNote } from "@blocknote/react";

import "@blocknote/mantine/style.css";
import "@blocknote/core/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({ 
            file
        });

        return response.url;
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload
    })


    return (
        <div>
            <BlockNoteView
                editable = {editable}
                onChange = {() => {
                    onChange(JSON.stringify(editor.document, null, 2));
                }}
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                
            >
                {/* <div className="flex justify-center items-center">
                    <FormattingToolbar />
                </div> */}
            </BlockNoteView>
            
        </div>
    )
}

export default Editor;