import {EditorContent, useEditor, useEditorState} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import React from "react";

const TiptapEditor = ({ content, onFocus, onUpdate, setActiveEditor }) => {
    const editor = useEditor({
        extensions: [
            //Color.configure({ types: [TextStyle.name, ListItem.name] }),
            //TextStyle.configure({ types: [ListItem.name] }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: true, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }), // Используем StarterKit
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