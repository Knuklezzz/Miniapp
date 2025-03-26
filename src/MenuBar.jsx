import { useEditor } from "@tiptap/react";

const MenuBar = ({ editorId }) => {
    const editor = useEditor();

    if (!editor) return null;

    return (
        <div className="menu-bar">
            <button onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is-active" : ""}
            >
                Bold
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "is-active" : ""}
            >
                Italic
            </button>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "is-active" : ""}
            >
                Bullet List
            </button>
        </div>
    );
};

export default MenuBar;