/*
import React, { useState, useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Editor } from "slate";

const SlateEditor = ({ note = "" }) => {
    const editor = useMemo(() => withReact(createEditor()), []);

    // Конвертируем строку note в нужный формат
    const initialValue = useMemo(() => {
        return note
            ? [{ type: "paragraph", children: [{ text: note }] }]
            : [{ type: "paragraph", children: [{ text: "" }] }];
    }, [note]); // Пересчитываем при изменении note

    // Функция переключения жирного текста
    const toggleBold = () => {
        const marks = Editor.marks(editor) || {}; // Проверяем, есть ли marks
        if (marks.bold) {
            Editor.removeMark(editor, "bold");
        } else {
            Editor.addMark(editor, "bold", true);
        }
    };

    // Функция рендеринга стилей текста
    const renderLeaf = useCallback(({ attributes, children, leaf }) => {
        if (leaf.bold) {
            children = <strong>{children}</strong>;
        }
        return <span {...attributes}>{children}</span>;
    }, []);

    return (
        <>
            <Slate editor={editor} initialValue={initialValue}>
                <Editable
                    className='textarea'
                    placeholder="Введите текст..."
                    renderLeaf={renderLeaf}
                />
            </Slate>
            <button
                onMouseDown={(event) => {
                    event.preventDefault();
                    toggleBold();
                }}
            >
                B
            </button>
        </>
    );
};

export default SlateEditor;*/
/*
import React, { useMemo, useCallback, useImperativeHandle, forwardRef } from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const SlateEditor = forwardRef((props, ref) => {
    const editor = useMemo(() => withReact(createEditor()), []);

    // Функция переключения жирного текста
    useImperativeHandle(ref, () => ({
        toggleBold: () => {
            const marks = Editor.marks(editor); // Получаем текущие стили текста
            if (marks?.bold) {
                Editor.removeMark(editor, "bold");
            } else {
                Editor.addMark(editor, "bold", true);
            }
        }
    }));

    // Рендеринг текста с жирным стилем
    const renderLeaf = useCallback(({ attributes, children, leaf }) => {
        if (leaf.bold) {
            children = <strong>{children}</strong>;
        }
        return <span {...attributes}>{children}</span>;
    }, []);

    return (
        <Slate editor={editor} initialValue={[{ type: "paragraph", children: [{ text: "Напишите что-нибудь..." }] }]}>
            <Editable renderLeaf={renderLeaf} className="textarea" />
        </Slate>
    );
});

export default SlateEditor;*/
import React from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Text } from "slate";

const SlateEditor = ({ editor, value, setValue }) => {
    // Рендеринг текста с учетом жирного, курсивного и подчеркнутого
    const renderLeaf = ({ attributes, children, leaf }) => {
        if (leaf.bold) children = <strong>{children}</strong>;
        if (leaf.italic) children = <em>{children}</em>;
        if (leaf.underline) children = <u>{children}</u>;
        return <span {...attributes}>{children}</span>;
    };

    return (
        <Slate editor={editor} initialValue={value} onChange={(newValue) => setValue(newValue)}>
            <Editable renderLeaf={renderLeaf} />
        </Slate>
    );
};

export default SlateEditor;