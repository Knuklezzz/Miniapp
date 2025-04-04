import React, { useState, useEffect, useRef, useMemo, useLayoutEffect, useCallback } from "react";
import WebApp from "@twa-dev/sdk";
import '@/index.css';
import { supabase } from "./supabaseClient.js";
import {Bold, ChevronLeft, ChevronRight, Italic, Underline} from 'lucide-react';
import MyAnimation from "@/Loader.jsx";
import DatePicker from "@/DatePicker.jsx";
import { BottomBar, MainButton, SecondaryButton } from '@twa-dev/sdk/react';

import { Button } from "@/components/ui/button.jsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
//import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import TiptapEditor from "@/TiptapEditor.jsx";
//import MenuBar from "./MenuBar";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder';
import {ToggleGroupDemo} from "@/ToggleGroupDemo.jsx";
//import BottomBar from "@/BottomBar.jsx";
import StickyBottomBar from "./StickyBottomBar.jsx";
import QuoteComponent from "@/QuoteComponent.jsx";

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

function getWeekDates(date) {
    const monday = new Date(date);
    monday.setDate(date.getDate() - (date.getDay() || 7) + 1); //находим число понедельника
    console.log(`GETWEEKDAYS!`);
    const weekDates = {};
    days.forEach((day, index) => {
        const currentDate = new Date(monday);
        //console.log(`currentDateнайд${currentDate}`);
        currentDate.setDate(monday.getDate() + index);
        //console.log(`currentDateнайд${currentDate}`);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // месяцы с 0, поэтому +1
        const dayy = String(currentDate.getDate()).padStart(2, '0');
        weekDates[day] = `${year}-${month}-${dayy}`;

    });

    return weekDates;
}


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="menu-bar">
            <Button onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}>
                Bold
            </Button>
            <Button onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}>
                Italic
            </Button>
            <Button onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}>
                Strike
            </Button>
            <Button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                Undo
            </Button>
            <Button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                Redo
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
                H1
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                Bullet list
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                Ordered list
            </Button>
        </div>
    );
};

function App() {

    const params = new URLSearchParams(WebApp.initData);
    const user = JSON.parse(params.get("user") || "{}");
    const userId = user?.id || null;


    //const textareaRef = useRef(null);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [currDate, setCurrDate] = useState(new Date());
    const [notes, setNotes] = useState({});
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const tiptapEditorRef = useRef(null);
    const [bottomPosition, setBottomPosition] = useState(0);
    const [bottomRect, setBottomRect] = useState(0);

    //вычисляю 5 недель для первого фетча
    const [weekDates, setWeekDates] = useState(getWeekDates(new Date (currDate)));
    const [prevWeekDate, setPrevWeekDate] = useState(getWeekDates(new Date(currDate.getTime() - 7 * 24 * 60 * 60 * 1000)));
    const [prev2WeekDate, setPrev2WeekDate] = useState(getWeekDates(new Date(currDate.getTime() - 14 * 24 * 60 * 60 * 1000)));
    const [nextWeekDate, setNextWeekDate] = useState(getWeekDates(new Date(currDate.getTime() + 7 * 24 * 60 * 60 * 1000)));
    const [next2WeekDate, setNext2WeekDate] = useState(getWeekDates(new Date(currDate.getTime() + 14 * 24 * 60 * 60 * 1000)));

    const [activeEditor, setActiveEditor] = useState(null);

    useEffect(() => {
        const root = document.documentElement;

        if (!root.style.getPropertyValue("--tile-size")) {
            root.style.setProperty("--tile-size", `${40 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--height", `${24 * (window.innerHeight / 100)}px`);
            root.style.setProperty("--gap-size", `${2 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--padding", `${1 * (window.innerWidth / 100)}px`);
        }
    }, []);

    useEffect(() => {

        //if (!userId) return;

        const fetchNotes = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Задержка 1 сек
            //вставить проверку того есть ли уже данные по дням в notes
            //const dateValues = Object.values(weekDates); //weekDates - даты отображаемой недели
            const dateValues = [
                ...Object.values(prev2WeekDate),
                ...Object.values(prevWeekDate),
                ...Object.values(weekDates),
                ...Object.values(nextWeekDate),
                ...Object.values(next2WeekDate)
            ];


            console.log(weekDates);
            const {data, error} = await supabase
                .from("user_notes")
                .select("date, note")
                .eq("user_id", userId)
                .in("date", dateValues);

            if (error) {
                console.error("Ошибка загрузки данных:", error);
            } else {
                const fetchedNotes = {};
                data.forEach(({date, note}) => {
                    fetchedNotes[date] = note;
                });

                setNotes(fetchedNotes);
            }
            setLoading(false);
        };
        fetchNotes();

    }, [userId, currDate]);


    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debouncedValue;
    }

    const handleNoteChange = (date, newNote) => {
        setNotes((prevNotes) => {
            if (prevNotes[date] === newNote) return prevNotes;
            return { ...prevNotes, [date]: newNote };
        });
    };

    const debouncedNotes = useDebounce(notes, 500); // Задержка 1 секунда перед записью в БД

    useEffect(() => {
        const updateNotesInDB = async () => {
            if (!userId) return;

            for (const [date, note] of Object.entries(debouncedNotes)) {
                if (note.trim() === "") {
                    await supabase.from("user_notes").delete()
                        .eq("user_id", userId)
                        .eq("date", date);
                } else {
                    const { data } = await supabase
                        .from("user_notes")
                        .select("id")
                        .eq("user_id", userId)
                        .eq("date", date)
                        .single();

                    if (data) {
                        await supabase.from("user_notes").update({ note })
                            .eq("user_id", userId)
                            .eq("date", date);
                    } else {
                        await supabase.from("user_notes").insert([{ user_id: userId, date, note }]);
                    }
                }
            }
        };

        updateNotesInDB();
    }, [debouncedNotes]);



    const navigateWeek = async (direction) => {

        const newCurrentWeek = new Date(Object.values(weekDates)[0]);

        if (direction === "next") {

            const newNext2WeekDate = getWeekDates(new Date(newCurrentWeek.getTime() + 21 * 24 * 60 * 60 * 1000));
            console.log(newNext2WeekDate);
            setPrevWeekDate(weekDates);
            setWeekDates(nextWeekDate);
            setNextWeekDate(next2WeekDate);
            setNext2WeekDate(newNext2WeekDate);

            // Загружаем заметки для новой недели next2WeekDate
            await fetchNotesForWeek(newNext2WeekDate);

            // Удаляем старые заметки для prev2WeekDate
            setNotes((prevNotes) => {
                const updatedNotes = { ...prevNotes };
                Object.values(prev2WeekDate).forEach(date => delete updatedNotes[date]);
                return updatedNotes;
            });

            setPrev2WeekDate(getWeekDates(new Date(newCurrentWeek.getTime() - 7 * 24 * 60 * 60 * 1000)));//поменял 7 на 14 тк думаю так правильно спойлер было неправильно
        } else {

            const newPrev2WeekDate = getWeekDates(new Date(newCurrentWeek.getTime() - 21 * 24 * 60 * 60 * 1000));
            setNextWeekDate(weekDates);
            setWeekDates(prevWeekDate);
            setPrevWeekDate(prev2WeekDate);
            setPrev2WeekDate(newPrev2WeekDate);

            // Загружаем заметки для новой недели prev2WeekDate
            await fetchNotesForWeek(newPrev2WeekDate);

            // Удаляем старые заметки для next2WeekDate
            setNotes((prevNotes) => {
                const updatedNotes = { ...prevNotes };
                Object.values(next2WeekDate).forEach(date => delete updatedNotes[date]);
                return updatedNotes;
            });

            setNext2WeekDate(getWeekDates(new Date(newCurrentWeek.getTime() + 7 * 24 * 60 * 60 * 1000))); //поменял 7 на 14 тк думаю так правильно спойлер было неправильно
        }
    };


// Функция загрузки заметок для недели
    const fetchNotesForWeek = async (weekDates) => {
        if (!userId) return;

        const dateValues = Object.values(weekDates);

        const { data, error } = await supabase
            .from("user_notes")
            .select("date, note")
            .eq("user_id", userId)
            .in("date", dateValues);

        if (error) {
            console.error("Ошибка загрузки данных:", error);
        } else {
            setNotes((prevNotes) => {
                const updatedNotes = { ...prevNotes };
                data.forEach(({ date, note }) => {
                    updatedNotes[date] = note;
                });
                return updatedNotes;
            });
        }
    };


    useEffect(() => {
        const handleFocus = (event) => {
            const target = event.target;
            const editorContainer = target.closest('.editor-container');

            if (editorContainer) {
                //containerRef.current.style.transform = `translateY(0)`;
                const rect = editorContainer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const keyboardHeight = viewportHeight * 0.55; // 45% от экрана — примерная высота клавиатуры
                const bottomPosition = rect.bottom;
                //console.log(rect.bottom);
                const visibleHeight = viewportHeight - keyboardHeight;
                //setBottomPosition(keyboardHeight);
                //setIsKeyboardOpen(true);

                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);



                if (bottomPosition > visibleHeight) {
                    const scrollAmount = bottomPosition - visibleHeight;
                    if (containerRef.current) {
                        containerRef.current.style.transform = `translateY(-${scrollAmount}px)`;
                        //const bottombarPos = WebApp.viewportHeight;
                        setBottomPosition(scrollAmount);

                    }
                } else {
                    setBottomPosition(0);
                }
            }

        };

        const handleBlur = () => {
            if (containerRef.current) {
                containerRef.current.style.transform = 'translateY(0)';
                //setIsKeyboardOpen(false);
            }
        };

        const preventScroll = (event) => {
            event.preventDefault();
        };

/*        const handleBlur = (event) => {
            if (
                containerRef.current &&
                containerRef.current.contains(event.relatedTarget)
            ) {
                return; // НЕ убираем StickyBottomBar, если кликнули на него
            }
            if (containerRef.current) {
                containerRef.current.style.transform = "translateY(0)";
            }
        };*/

        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);
        document.addEventListener('touchmove', preventScroll, { passive: false });

        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
            document.removeEventListener('touchmove', preventScroll);
        };
    }, []);

/*
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, { passive: false });
*/

   /* useEffect(() => {

        const handleFocus = (event) => {
            const target = event.target;
            const editorContainer = target.closest('.editor-container');

            if (editorContainer) {
                containerRef.current.style.transform = `translateY(0)`;
                const rect = editorContainer.getBoundingClientRect();
                const viewportHeight = WebApp.viewportHeight;
                const keyboardHeight = viewportHeight * 0.45; // 45% от экрана — примерная высота клавиатуры
                const bottomPosition = rect.bottom;
                const visibleHeight = viewportHeight - keyboardHeight;
                //setIsKeyboardOpen(true);

                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);

                if (bottomPosition > visibleHeight) {
                    const scrollAmount = bottomPosition - visibleHeight;
                    if (containerRef.current) {
                        containerRef.current.style.transform = `translateY(-${scrollAmount}px)`;
                        setBottomPosition(scrollAmount);
                    }
                } else {
                    setBottomPosition(0);
                }
            }
        };

        const handleBlur = () => {
            if (containerRef.current) {
                containerRef.current.style.transform = 'translateY(0)';
                //setIsKeyboardOpen(false);
            }
        };

/!*        const preventScroll = (event) => {
            event.preventDefault();
        };*!/

        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);
        //document.addEventListener('touchmove', preventScroll, { passive: false });

        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
            //document.removeEventListener('touchmove', preventScroll);
        };
    }, []);*/

    const columnLeft = days.slice(0, 3);
    const columnRight = days.slice(3);
    console.log("App re-rendered");
    console.count('App re-rendered');
    return loading ? <MyAnimation className="loader"/> : (
        <div
            ref={containerRef}
        >
            <div className='navigation'>

                <DatePicker selectedDate={currDate} setSelectedDate={(date) => {
                    //console.log("Выбранная дата:", date); // Смотрим, что приходит из календаря
                    if (date) {
                        const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        //console.log("Дата после обработки:", localDate); // Проверяем, нет ли сдвига
                        setCurrDate(new Date(localDate));
                        setWeekDates(getWeekDates(localDate));
                        setPrevWeekDate(getWeekDates(new Date(localDate.getTime() - 7 * 24 * 60 * 60 * 1000)));
                        setPrev2WeekDate(getWeekDates(new Date(localDate.getTime() - 14 * 24 * 60 * 60 * 1000)));
                        setNextWeekDate(getWeekDates(new Date(localDate.getTime() + 7 * 24 * 60 * 60 * 1000)));
                        setNext2WeekDate(getWeekDates(new Date(localDate.getTime() + 14 * 24 * 60 * 60 * 1000)));
                    }
                }} />
                <div className="navigation-container">
                    <button
                        className="nav-button"
                        onClick={() => navigateWeek('prev')}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="quote-container">
                    <QuoteComponent></QuoteComponent>
                    </div>
                    <button
                        className="nav-button"
                        onClick={() => navigateWeek('next')}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div></div>
            {/*{WebApp.viewportStableHeight}*/}
            <div className="flex-container">
                <div className="columnLeft">
                    {columnLeft.map((day, index) => (
                        <div key={index} className={`left-flex-item-${index}`}>
                            <div className="editor-container">
                                <h4 className="days">
                                    {day}
                                    <span className="date-display">
                                    {weekDates[day] && formatDate(weekDates[day])}
                                </span>
                                </h4>
                                <div className="Editor">
                                    <TiptapEditor

                                        key={weekDates[day]}  // Перерисовываем при смене недели
                                        content={notes[weekDates[day]] ?? ''}
                                        onFocus={() => setActiveEditor(day)}
                                        onUpdate={(newContent) => handleNoteChange(weekDates[day], newContent)}
                                        setActiveEditor={setActiveEditor}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="columnRight">
                    {columnRight.map((day, index) => (
                        <div key={index} className={`right-flex-item-${index}`}>
                            <div className="editor-container">
                                <h4 className="days">
                                    {day}
                                    <span className="date-display">
                                    {weekDates[day] && formatDate(weekDates[day])}
                                </span>
                                </h4>
                                <div className="Editor">
                                    <TiptapEditor

                                        key={weekDates[day]}  // Перерисовываем при смене недели
                                        content={notes[weekDates[day]] || ''}
                                        onFocus={() => setActiveEditor(day)}
                                        onUpdate={(newContent) => handleNoteChange(weekDates[day], newContent)}
                                        setActiveEditor={setActiveEditor}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {activeEditor &&
                <StickyBottomBar scrollAmount={bottomPosition}>
                    <MenuBar editor={activeEditor}></MenuBar>

                </StickyBottomBar>}
        </div>
    );
}

export default App;   //моя после