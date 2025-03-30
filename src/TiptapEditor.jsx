import {EditorContent, useEditor, useEditorState} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React from "react";

const TiptapEditor = ({ content, onFocus, onUpdate, setActiveEditor }) => {
    const editor = useEditor({
        extensions: [
            StarterKit, // Используем StarterKit
            Placeholder.configure({
                placeholder: 'Запишите планы...', // Ваш текст, который будет отображаться, когда редактор пуст
            }),
        ],
        content,
        onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
        onFocus: () => setActiveEditor(editor),
        onBlur: () => setActiveEditor(null),


    });

    if (!editor) return null;

    return (

        <EditorContent className="EDD" editor={editor} />

    );
};

export default TiptapEditor