/*
import { useEditor } from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import { EditorContent } from "@tiptap/react";

const TiptapEditor = ({ id, content, onFocus, onUpdate }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
        onFocus: () => setActiveEditor(editor),
        onBlur: () => setActiveEditor(null),
    });

    if (!editor) return null;

    return (
        <div onFocus={onFocus}>
            <EditorContent editor={editor} className="TiptapEditor" />
        </div>
    );
};

export default TiptapEditor;*/
