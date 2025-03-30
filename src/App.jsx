/*
import React, {useContext, useEffect} from "react";
import "./FlexGrid.css";
import WebApp from '@twa-dev/sdk'
import { BottomBar, MainButton, SecondaryButton } from '@twa-dev/sdk/react';
import { InitData } from "@twa-dev/sdk/react";
import { supabase } from "./supabaseClient";

const days = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
];

const tiles = Array.from({ length: 7 }, (_, i) => `${days[i]}`);

export default function FlexGrid() {

    const params = new URLSearchParams(WebApp.initData);
    const user = JSON.parse(params.get("user") || "{}");
    const userId = user?.id || null;

    const [notes, setNotes] = useState({});



    useEffect(() => {
        console.log("Telegram WebApp version:", WebApp.version);
        WebApp.disableClosingConfirmation();
        WebApp.lockOrientation();

        //WebApp.setHeaderColor(#ffffff);
    }, []);

    return (
        <>
        <div className="flex-container">
            {tiles.slice(0, 5).map((tile, index) => (
                <div key={index} className="flex-item">
                    <h4 className="days">{tile}</h4>

                    <textarea className="textarea"  />
                </div>
            ))}

            <div className="column-container">
                {tiles.slice(5).map((tile, index) => (
                    <div key={index + 5} className="flex-item larger">
                        <h4 className="days">{tile}</h4>
                        <textarea className="textarea" />
                    </div>
                ))}
            </div>
        </div>
            <div>
                <h1>InitData:</h1>
                <p>{user.id || "Нет данных"}</p>
            </div>
        </>
    );
}
*/

/*
import React, { useState, useEffect } from "react";
import "./FlexGrid.css";
import WebApp from "@twa-dev/sdk";
import { supabase } from "./supabaseClient.js"; // Подключаем Supabase
import {Loader} from "@/Loader.jsx";


const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];


export default function FlexGrid() {
    // Получаем ID пользователя
    const params = new URLSearchParams(WebApp.initData);
    const user = JSON.parse(params.get("user") || "{}");
    const userId = user?.id || null;

    // Состояние для хранения заметок
    const [ notes, setNotes] = useState({});
    const [loading, setLoading] = useState(true);

    // Загружаем данные из Supabase при загрузке страницы
    useEffect(() => {
        if (!userId) return;

        const fetchNotes = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const { data, error } = await supabase
                .from("user_notes")
                .select("day, note")
                .eq("user_id", userId);

            if (error) console.error("Ошибка загрузки данных:", error);
            else {
                const fetchedNotes = {};
                data.forEach(({ day, note }) => {
                    fetchedNotes[day] = note;
                });
                setNotes(fetchedNotes);
            }
            setLoading(false);
        };

        fetchNotes();
        const timeoutId = setTimeout(fetchNotes, 500); // Задержка перед вызовом fetchNotes (0.5 сек)

        return () => clearTimeout(timeoutId); // Очищаем таймер при размонтировании компонента
    }, [userId]);

    // Функция для обновления заметок
    const handleNoteChange = async (day, note) => {
        setNotes((prevNotes) => ({ ...prevNotes, [day]: note }));

        if (!userId) return;

        // Проверяем, есть ли уже заметка в БД
        const { data } = await supabase
            .from("user_notes")
            .select("id")
            .eq("user_id", userId)
            .eq("day", day)
            .single();

        if (data) {
            // Если запись уже есть, обновляем её
            await supabase
                .from("user_notes")
                .update({ note })
                .eq("user_id", userId)
                .eq("day", day);
        } else {
            // Если записи нет, создаем новую
            await supabase.from("user_notes").insert([{ user_id: userId, day, note }]);
        }
    };
    const columnLeft = days.slice(0, 3);  // Берем первые 3 дня
    const columnRight = days.slice(3);    // Берем оставшиеся дни


    return (loading ? <Loader /> :(
        <>
            <div className="flex-container">
                <div className="columnLeft">
                {columnLeft.map((day, index) => (
                    <div key={index} className={`left-flex-item-${index}`} >
                        <h4 className="days">{day}</h4>
                        <textarea
                            className="textarea"
                            value={notes[day] || ""}
                            onChange={(e) => handleNoteChange(day, e.target.value)}
                        />
                    </div>
                ))}
                </div>
                <div className="columnRight">
                    {columnRight.map((day, index) => (
                        <div key={index} className={`right-flex-item-${index}`} >
                            <h4 className="days">{day}</h4>
                            <textarea
                                className="textarea"
                                value={notes[day] || ""}
                                onChange={(e) => handleNoteChange(day, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>


                {/!*<div className="column-container">
                    {days.slice(5).map((day, index) => (
                        <div key={index + 5} className="flex-item larger">
                            <h4 className="days">{day}</h4>
                            <textarea
                                className="textarea"
                                value={notes[day] || ""}
                                onChange={(e) => handleNoteChange(day, e.target.value)}
                            />
                        </div>
                    ))}
                </div>*!/}


        </>));

}
*/



/*
import React, { useState, useEffect, useRef } from "react";
import "./FlexGrid.css";
import WebApp from "@twa-dev/sdk";
import { supabase } from "./supabaseClient.js"; // Подключаем Supabase
import { Loader } from "@/Loader.jsx";
import { motion } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline } from "lucide-react"


import { BottomBar, MainButton, SecondaryButton } from '@twa-dev/sdk/react';



const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

export default function FlexGrid() {
    const params = new URLSearchParams(WebApp.initData);
    const user = JSON.parse(params.get("user") || "{}");
    const userId = user?.id || null;
    //WebApp.disableVerticalSwipes();
    //WebApp.requestFullscreen();

    const [notes, setNotes] = useState({});
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);  // Если userId нет, сразу отключаем загрузку
            return;
        }

        const fetchNotes = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Задержка 1 сек

            const {data, error} = await supabase
                .from("user_notes")
                .select("day, note")
                .eq("user_id", userId);

            if (error) {
                console.error("Ошибка загрузки данных:", error);
            } else {
                const fetchedNotes = {};
                data.forEach(({day, note}) => {
                    fetchedNotes[day] = note;
                });
                setNotes(fetchedNotes);
            }
            setLoading(false);
        };

        fetchNotes(); // Один вызов достаточно

    }, [userId]);

    const handleNoteChange = async (day, note) => {
        setNotes((prevNotes) => ({...prevNotes, [day]: note}));

        if (!userId) return;

        const {data} = await supabase
            .from("user_notes")
            .select("id")
            .eq("user_id", userId)
            .eq("day", day)
            .single();

        if (data) {
            await supabase
                .from("user_notes")
                .update({note})
                .eq("user_id", userId)
                .eq("day", day);
        } else {
            await supabase.from("user_notes").insert([{user_id: userId, day, note}]);
        }
    };

    const columnLeft = days.slice(0, 3);
    const columnRight = days.slice(3);


    useEffect(() => {
        const root = document.documentElement;

        if (!root.style.getPropertyValue("--tile-size")) {
            root.style.setProperty("--tile-size", `${40 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--height", `${30 * (window.innerHeight / 100)}px`);
            root.style.setProperty("--gap-size", `${2 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--padding", `${1 * (window.innerWidth / 100)}px`);
        }
    }, []);

    return loading ? <Loader/> : (
        <>
            <motion.div
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: "easeInOut"}} // Плавное замедление
            >
                <div className="flex-container">
                    <div className="columnLeft">
                        {columnLeft.map((day, index) => (
                            <div key={index} className={`left-flex-item-${index}`}>
                                <h1 className="days">{day}</h1>
                                <textarea
                                    className="textarea"
                                    value={notes[day] || ""}
                                    onChange={(e) => handleNoteChange(day, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="columnRight">
                        {columnRight.map((day, index) => (
                            <div key={index} className={`right-flex-item-${index}`}>
                                <h4 className="days">{day}</h4>
                                <textarea
                                    className="textarea"
                                    value={notes[day] || ""}
                                    onChange={(e) => handleNoteChange(day, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
}

*/
/*import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import "./FlexGrid.css";
import WebApp from "@twa-dev/sdk";
import { supabase } from "./supabaseClient.js";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"


const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

function getWeekDates(date) {
    const monday = new Date(date);
    monday.setDate(date.getDate() - (date.getDay() || 7) + 1); //находим число понедельника

    const weekDates = {};
    days.forEach((day, index) => {
        const currentDate = new Date(monday);
        currentDate.setDate(monday.getDate() + index);
        weekDates[day] = currentDate.toISOString().split('T')[0]; //каждому дню недели нашли его дату
    });

    return weekDates;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}


function App() {

    const params = new URLSearchParams(WebApp.initData);
    const user = JSON.parse(params.get("user") || "{}");
    const userId = user?.id || null;

    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [notes, setNotes] = useState({});
    //const [weekDates, setWeekDates] = useState({});
    const containerRef = useRef(null);

/!*    useEffect(() => {
        if (!userId) {
            //etLoading(false);  // Если userId нет, сразу отключаем загрузку
            return;
        }

        const fetchNotes = async () => {
            //setLoading(true);
            //await new Promise((resolve) => setTimeout(resolve, 2000)); // Задержка 1 сек

            const {data, error} = await supabase
                .from("user_notes")
                .select("day, note")
                .eq("user_id", userId);

            if (error) {
                console.error("Ошибка загрузки данных:", error);
            } else {
                const fetchedNotes = {};
                data.forEach(({day, note}) => {
                    fetchedNotes[day] = note;
                });
                setNotes(fetchedNotes);
            }
            //setLoading(false);
        };

        fetchNotes(); // Один вызов достаточно

    }, [userId]);*!/

/!*
    useEffect(() => {
        setWeekDates(getWeekDates(currentWeek));

    }, [currentWeek]);
*!/

    /!*const weekDates = useMemo(() => getWeekDates(currentWeek), [currentWeek]);
    const prevWeekDate = useMemo(() => getWeekDates(new Date(currentWeek.getDate() - 7 )), [currentWeek]);
    const nextWeekDate = useMemo(() => getWeekDates(new Date(currentWeek.getDate() + 7 )), [currentWeek]);*!/

    const [weekDates, setWeekDates] = useState(getWeekDates(currentWeek));
    const [prevWeekDate, setPrevWeekDate] = useState(getWeekDates(new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000)));
    const [prev2WeekDate, setPrev2WeekDate] = useState(getWeekDates(new Date(currentWeek.getTime() - 14 * 24 * 60 * 60 * 1000)));
    const [nextWeekDate, setNextWeekDate] = useState(getWeekDates(new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000)));
    const [next2WeekDate, setNext2WeekDate] = useState(getWeekDates(new Date(currentWeek.getTime() + 14 * 24 * 60 * 60 * 1000)));



    useEffect(() => {

        if (!userId || !weekDates[days[0]]) return;

        setWeekDates(getWeekDates(currentWeek));
        setPrevWeekDate(getWeekDates(new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000)));
        setPrev2WeekDate(getWeekDates(new Date(currentWeek.getTime() - 14 * 24 * 60 * 60 * 1000)));
        setNextWeekDate(getWeekDates(new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000)));
        setNext2WeekDate(getWeekDates(new Date(currentWeek.getTime() + 14 * 24 * 60 * 60 * 1000)));

        const fetchNotes = async () => {
            //setLoading(true);
            //await new Promise((resolve) => setTimeout(resolve, 2000)); // Задержка 1 сек

            //const dateValues = Object.values(weekDates); //weekDates - даты отображаемой недели
            const dateValues = [
                ...Object.values(prev2WeekDate),
                ...Object.values(prevWeekDate),
                ...Object.values(weekDates),
                ...Object.values(nextWeekDate),
                ...Object.values(next2WeekDate)
            ];

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
        };
        /!*const fetchNotes = async () => {
            const dateValues = Object.values(weekDates);

            const { data, error } = await supabase
                .from("user_notes")
                .select("day, note, date")
                .eq("user_id", userId)
                .in("date", dateValues);

            if (error) {
                console.error("Ошибка загрузки данных:", error);
            } else {
                const fetchedNotes = {};
                data.forEach(({ day, note, date }) => {
                    fetchedNotes[date] = note;
                });
                setNotes(fetchedNotes);
            }
        };*!/

        fetchNotes();
    }, [userId, currentWeek]);



    const handleNoteChange = async (date, note) => {
        setNotes((prevNotes) => ({...prevNotes, [date]: note}));

        if (!userId) return;

        const {data} = await supabase
            .from("user_notes")
            .select("id")
            .eq("user_id", userId)
            .eq("date", date)
            .single();

        if (data) {
            await supabase
                .from("user_notes")
                .update({note})
                .eq("user_id", userId)
                .eq("date", date);
        } else {
            await supabase.from("user_notes").insert([{user_id: userId, date, note}]);
        }
    };

/!*    const handleNoteChange = async (date, note) => {
        setNotes((prevNotes) => ({ ...prevNotes, [date]: note }));

        if (!userId) return;

        const { data } = await supabase
            .from("user_notes")
            .select("id")
            .eq("user_id", userId)
            .eq("date", date)
            .single();

        if (data) {
            await supabase
                .from("user_notes")
                .update({ note })
                .eq("user_id", userId)
                .eq("date", date);
        } else {
            await supabase
                .from("user_notes")
                .insert([{ user_id: userId, day, note, date }]);
        }
    };*!/

/!*    const navigateWeek = (direction) => {
        setCurrentWeek(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
            return newDate;
        });
    };*!/

/!*    const navigateWeek = (direction) => {
        //setWeekDates(direction === 'next' ? nextWeekDate : prevWeekDate);
/!*        if (direction === 'next') {
            setPrevWeekDate(weekDates);
            setWeekDates(nextWeekDate);
            setNextWeekDate(next2WeekDate);
            setNext2WeekDate(getWeekDates(new Date(nextWeekDate.getTime() + 7 * 24 * 60 * 60 * 1000)))
        } else {
            setNextWeekDate(weekDates);
            setWeekDates(prevWeekDate);
            setPrev2WeekDate(getWeekDates(new Date(prevWeekDate.getTime() + 7 * 24 * 60 * 60 * 1000)))
        }*!/

    };*!/

    const navigateWeek = async (direction) => {
        const newCurrentWeek = new Date(Object.values(weekDates)[0]);

        if (direction === "next") {
            const newNext2WeekDate = getWeekDates(new Date(next2WeekDate[days[0]]));
            newNext2WeekDate[days[0]] = new Date(newNext2WeekDate[days[0]]).getTime() + 7 * 24 * 60 * 60 * 1000;

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

            setPrev2WeekDate(getWeekDates(new Date(newCurrentWeek.getTime() - 14 * 24 * 60 * 60 * 1000)));
        } else {
            const newPrev2WeekDate = getWeekDates(new Date(prev2WeekDate[days[0]]));
            newPrev2WeekDate[days[0]] = new Date(newPrev2WeekDate[days[0]]).getTime() - 7 * 24 * 60 * 60 * 1000;

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

            setNext2WeekDate(getWeekDates(new Date(newCurrentWeek.getTime() + 14 * 24 * 60 * 60 * 1000)));
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

        const newCurrentWeek = new Date(Object.values(weekDates)[0]); // Берем дату понедельника новой недели

/!*
        if (weekDates === nextWeekDate) {
            setNext2WeekDate(getWeekDates(new Date(next2WeekDate.getTime() + 7 * 24 * 60 * 60 * 1000)))
        } else {
            setPrev2WeekDate(getWeekDates(new Date(prev2WeekDate.getTime() - 7 * 24 * 60 * 60 * 1000)));
        }
*!/

        /!*const fetchNotes2 = async () => {

            const dateValues = [
                ...Object.values(prev2WeekDate),
                ...Object.values(prevWeekDate),
                ...Object.values(weekDates),
                ...Object.values(nextWeekDate),
                ...Object.values(next2WeekDate)
            ];

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
        };

        fetchNotes2();*!/


        setPrevWeekDate(getWeekDates(new Date(newCurrentWeek.getTime() - 7 * 24 * 60 * 60 * 1000)));
        setNextWeekDate(getWeekDates(new Date(newCurrentWeek.getTime() + 7 * 24 * 60 * 60 * 1000)));

    }, [weekDates]);

    useEffect(() => {
        const handleFocus = (event) => {
            const target = event.target;
            if (target.tagName === 'TEXTAREA') {
                const rect = target.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const keyboardHeight = viewportHeight * 0.4;
                const bottomPosition = rect.bottom;
                const visibleHeight = viewportHeight - keyboardHeight;

                if (bottomPosition > visibleHeight) {
                    const scrollAmount = bottomPosition - visibleHeight;
                    if (containerRef.current) {
                        containerRef.current.style.transform = `translateY(-${scrollAmount}px)`;
                    }
                }
            }
        };

        const handleBlur = () => {
            if (containerRef.current) {
                containerRef.current.style.transform = 'translateY(0)';
            }
        };

        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);

        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        };
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (!root.style.getPropertyValue("--tile-size")) {
            root.style.setProperty("--tile-size", `${33 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--height", `${25 * (window.innerHeight * 0.8 / 100)}px`);
            root.style.setProperty("--gap-size", `${2 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--padding", `${1 * (window.innerWidth / 100)}px`);
        }
    }, []);

    const columnLeft = days.slice(0, 3);
    const columnRight = days.slice(3);


    return (
        /!*<div className="min-h-screen bg-gray-900 text-white" ref={containerRef}>
            <div className="flex-container">
                <div className="columnLeft">
                    {columnLeft.map((day, index) => (
                        <div key={index} className={`left-flex-item-${index}`}>
                            <h4 className="days">{day}</h4>
                            <textarea
                                className="textarea"
                                value={notes[day] || ''}
                                onChange={(e) => handleNoteChange(day, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <div className="columnRight">
                    {columnRight.map((day, index) => (
                        <div key={index} className={`right-flex-item-${index}`}>
                            <h4 className="days">{day}</h4>
                            <textarea
                                className="textarea"
                                value={notes[day] || ''}
                                onChange={(e) => handleNoteChange(day, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>*!/
        <div className="min-h-screen bg-gray-900 text-white" ref={containerRef}>
            <Calendar
                mode="single"
                selected={currentWeek}
                onSelect={(date) =>  setCurrentWeek(new Date(date))}

                    className="rounded-md border"
            />
            <div className="navigation-container">
                <button
                    className="nav-button"
                    onClick={() => navigateWeek('prev')}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    className="nav-button"
                    onClick={() => navigateWeek('next')}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            <div className="flex-container">
                <div className="columnLeft">
                    {columnLeft.map((day, index) => (
                        <div key={index} className={`left-flex-item-${index}`}>
                            <h4 className="days">
                                {day}
                                <span className="date-display">
                                    {weekDates[day] && formatDate(weekDates[day])}
                                </span>
                            </h4>
                            <textarea
                                className="textarea"
                                value={notes[weekDates[day]] || ''}
                                onChange={(e) => handleNoteChange(weekDates[day], e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <div className="columnRight">
                    {columnRight.map((day, index) => (
                        <div key={index} className={`right-flex-item-${index}`}>
                            <h4 className="days">
                                {day}
                                <span className="date-display">
                                    {weekDates[day] && formatDate(weekDates[day])}
                                </span>
                            </h4>
                            <textarea
                                className="textarea"
                                value={notes[weekDates[day]] || ''}
                                onChange={(e) => handleNoteChange(weekDates[day], e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;*/

/*
import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { supabase } from "./supabaseClient.js";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MyAnimation from "@/Loader.jsx";
import DatePicker from "@/DatePicker.jsx";
import { BottomBar, MainButton, SecondaryButton } from '@twa-dev/sdk/react';
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

function getWeekDates(date) {
    const monday = new Date(date);
    monday.setDate(date.getDate() - (date.getDay() || 7) + 1); //находим число понедельника
    console.log(`понедельник найд${monday}`);
    const weekDates = {};
    days.forEach((day, index) => {
        const currentDate = new Date(monday);
        console.log(`currentDateнайд${currentDate}`);
        currentDate.setDate(monday.getDate() + index);
        console.log(`currentDateнайд${currentDate}`);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // месяцы с 0, поэтому +1
        const dayy = String(currentDate.getDate()).padStart(2, '0');
        weekDates[day] = `${year}-${month}-${dayy}`;
        //weekDates[day] = currentDate.toISOString().split('T'); //каждому дню недели нашли его дату
        //weekDates[day] = currentDate.toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' })
        console.log(`дни неедели ${weekDates[day]}`);
    });

    return weekDates;
}


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}


function App() {

    const params = new URLSearchParams(WebApp.initData);
    const user = JSON.parse(params.get("user") || "{}");
    const userId = user?.id || null;


    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [currDate, setCurrDate] = useState(new Date());
    const [notes, setNotes] = useState({});
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);

/!*    const [weekDates, setWeekDates] = useState(getWeekDates(new Date(currDate)));
    const [prevWeekDate, setPrevWeekDate] = useState(getWeekDates(new Date(currDate.getDate() - 7 )));
    const [prev2WeekDate, setPrev2WeekDate] = useState(getWeekDates(new Date(currDate.getDate() - 14 )));
    const [nextWeekDate, setNextWeekDate] = useState(getWeekDates(new Date(currDate.getDate() + 7 )));
    const [next2WeekDate, setNext2WeekDate] = useState(getWeekDates(new Date(currDate.getDate() + 14)));*!/
    const [weekDates, setWeekDates] = useState(getWeekDates(new Date (currDate)));
    const [prevWeekDate, setPrevWeekDate] = useState(getWeekDates(new Date(currDate.getTime() - 7 * 24 * 60 * 60 * 1000)));
    const [prev2WeekDate, setPrev2WeekDate] = useState(getWeekDates(new Date(currDate.getTime() - 14 * 24 * 60 * 60 * 1000)));
    const [nextWeekDate, setNextWeekDate] = useState(getWeekDates(new Date(currDate.getTime() + 7 * 24 * 60 * 60 * 1000)));
    const [next2WeekDate, setNext2WeekDate] = useState(getWeekDates(new Date(currDate.getTime() + 14 * 24 * 60 * 60 * 1000)));

/!*    const [selectedText, setSelectedText] = useState(""); // Храним выделенный текст
    const [selectedTextRange, setSelectedTextRange] = useState({ start: 0, end: 0 }); // Границы выделения

    const handleSelection = (event, date) => {
        const textarea = event.target;
        const { selectionStart, selectionEnd, value } = textarea;

        if (selectionStart !== selectionEnd) {
            setSelectedText(value.substring(selectionStart, selectionEnd));
            setSelectedTextRange({ start: selectionStart, end: selectionEnd });
        } else {
            setSelectedText("");
        }
    };

    const makeTextBold = (date) => {
        if (!selectedText) return;

        setNotes((prevNotes) => {
            const currentText = prevNotes[date] || "";
            const { start, end } = selectedTextRange;

            // Вставляем **жирный текст**
            const newText =
                currentText.substring(0, start) +
                `**${selectedText}**` +
                currentText.substring(end);

            // Обновляем в Supabase
            handleNoteChange(date, newText);

            return { ...prevNotes, [date]: newText };
        });

        setSelectedText("");
    };*!/

/!*    const [weekDates, setWeekDates] = useState({});
    const [prevWeekDate, setPrevWeekDate] = useState({});
    const [prev2WeekDate, setPrev2WeekDate] = useState({});
    const [nextWeekDate, setNextWeekDate] = useState({});
    const [next2WeekDate, setNext2WeekDate] = useState({});*!/
/!*
    useEffect(() => {
        setWeekDates(getWeekDates(new Date(currDate)));
        setPrevWeekDate(getWeekDates(new Date(currDate.getTime() - 7 * 24 * 60 * 60 * 1000)));
        setPrev2WeekDate(getWeekDates(new Date(currDate.getTime() - 14 * 24 * 60 * 60 * 1000)));
        setNextWeekDate(getWeekDates(new Date(currDate.getTime() + 7 * 24 * 60 * 60 * 1000)));
        setNext2WeekDate(getWeekDates(new Date(currDate.getTime() + 14 * 24 * 60 * 60 * 1000)));
    }, [currDate]);*!/

    useEffect(() => {

        if (!userId) return;
        //console.log(currDate);

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
        //setLoading(false);

    }, [userId, currDate]);



    const handleNoteChange = async (date, note) => {
        setNotes((prevNotes) => ({...prevNotes, [date]: note}));
        // в этой дате удалить предыдущее значение перед добавлением нового.
        // форматирование происходить должно на стороне пользователя?
        if (!userId) return;

        const {data} = await supabase
            .from("user_notes")
            .select("id")
            .eq("user_id", userId)
            .eq("date", date)
            .single();

        if (data) {
            await supabase
                .from("user_notes")
                .update({note})
                .eq("user_id", userId)
                .eq("date", date);
        } else {
            await supabase.from("user_notes").insert([{user_id: userId, date, note}]);
        }
    };

    const navigateWeek = async (direction) => {

        const newCurrentWeek = new Date(Object.values(weekDates)[0]);

        if (direction === "next") {
            const newNext2WeekDate = getWeekDates(new Date(next2WeekDate[days[0]]));
            newNext2WeekDate[days[0]] = new Date(newNext2WeekDate[days[0]]).getTime() + 7 * 24 * 60 * 60 * 1000;

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

            setPrev2WeekDate(getWeekDates(new Date(newCurrentWeek.getTime() - 14 * 24 * 60 * 60 * 1000)));
        } else {
            const newPrev2WeekDate = getWeekDates(new Date(prev2WeekDate[days[0]]));
            newPrev2WeekDate[days[0]] = new Date(newPrev2WeekDate[days[0]]).getTime() - 7 * 24 * 60 * 60 * 1000;

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

            setNext2WeekDate(getWeekDates(new Date(newCurrentWeek.getTime() + 14 * 24 * 60 * 60 * 1000)));
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

        const newCurrentWeek = new Date(Object.values(weekDates)[0]); // Берем дату понедельника новой недели
        setPrevWeekDate(getWeekDates(new Date(newCurrentWeek.getTime() - 7 * 24 * 60 * 60 * 1000)));
        setNextWeekDate(getWeekDates(new Date(newCurrentWeek.getTime() + 7 * 24 * 60 * 60 * 1000)));

    }, [weekDates]);

    useEffect(() => {
        const handleFocus = (event) => {
            const target = event.target;
            if (target.tagName === 'TEXTAREA') {
                const rect = target.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const keyboardHeight = viewportHeight * 0.45;
                const bottomPosition = rect.bottom;
                const visibleHeight = viewportHeight - keyboardHeight;
                setIsKeyboardOpen(true);
                if (bottomPosition > visibleHeight) {
                    const scrollAmount = bottomPosition - visibleHeight;
                    if (containerRef.current) {
                        containerRef.current.style.transform = `translateY(-${scrollAmount}px)`;


                    }
                }
            }
        };

        const handleBlur = () => {
            if (containerRef.current) {
                containerRef.current.style.transform = 'translateY(0)';
                setIsKeyboardOpen(false);
            }
        };

        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);

        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        };
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (!root.style.getPropertyValue("--tile-size")) {
            root.style.setProperty("--tile-size", `${33 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--height", `${30 * (window.innerHeight * 0.8 / 100)}px`);
            root.style.setProperty("--gap-size", `${2 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--padding", `${1 * (window.innerWidth / 100)}px`);
        }
    }, []);

    const columnLeft = days.slice(0, 3);
    const columnRight = days.slice(3);


    return loading ? <MyAnimation/> : (
        <div className="min-h-screen bg-gray-900 text-white" ref={containerRef}>

            <DatePicker selectedDate={currDate} setSelectedDate={(date) => {
                console.log("Выбранная дата:", date); // Смотрим, что приходит из календаря
                if (date) {
                    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                    console.log("Дата после обработки:", localDate); // Проверяем, нет ли сдвига
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
                <button
                    className="nav-button"
                    onClick={() => navigateWeek('next')}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            <div className="flex-container">
                <div className="columnLeft">
                    {columnLeft.map((day, index) => (
                        <div key={index} className={`left-flex-item-${index}`}>
                            <h4 className="days">
                                {day}
                                <span className="date-display">
                                    {weekDates[day] && formatDate(weekDates[day])}
                                </span>
                            </h4>
                            <textarea
                                className="textarea"
                                value={notes[weekDates[day]] || ''}
                                onChange={(e) => handleNoteChange(weekDates[day], e.target.value)}
                                /!*onSelect={(e) => handleSelection(e, weekDates[day])}*!/
                            />
                        </div>
                    ))}
                </div>
                <div className="columnRight">
                    {columnRight.map((day, index) => (
                        <div key={index} className={`right-flex-item-${index}`}>
                            <h4 className="days">
                                {day}
                                <span className="date-display">
                                    {weekDates[day] && formatDate(weekDates[day])}
                                </span>
                            </h4>
                            <textarea
                                className="textarea"
                                value={notes[weekDates[day]] || ''}
                                onChange={(e) => handleNoteChange(weekDates[day], e.target.value)}
                                /!*onSelect={(e) => handleSelection(e, weekDates[day])}*!/
                            />
                        </div>
                    ))}
                </div>
            </div>
{/!*            {isKeyboardOpen &&
                <BottomBar bgColor="171717FF">
                    <MainButton text="Сделать жирным" onClick={() => makeTextBold(weekDates[day])} />
                    <SecondaryButton text="Cancel" onClick={() => alert('cancelled')} />
                </BottomBar>}*!/}
        </div>
    );
}



export default App;

*/


/*
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import WebApp from "@twa-dev/sdk";
import '@/index.css';
import { supabase } from "./supabaseClient.js";
import { Bold, ChevronLeft, ChevronRight, Italic, Underline } from 'lucide-react';
import MyAnimation from "@/Loader.jsx";
import DatePicker from "@/DatePicker.jsx";
import { BottomBar, MainButton, SecondaryButton } from '@twa-dev/sdk/react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import TiptapEditor from "@/TiptapEditor.jsx";
import StickyBottomBar from "@/StickyBottomBar.jsx";

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

const getWeekDates = (date) => {
    const monday = new Date(date);
    monday.setDate(date.getDate() - (date.getDay() || 7) + 1);
    return days.reduce((acc, day, index) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + index);
        acc[day] = d.toISOString().split('T')[0];
        return acc;
    }, {});
};

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

const App = () => {
    const params = new URLSearchParams(WebApp.initData);
    const user = JSON.parse(params.get("user") || "{}");
    const userId = user?.id || null;
    const [currDate, setCurrDate] = useState(new Date());
    const [notes, setNotes] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeEditor, setActiveEditor] = useState(null);
    const containerRef = useRef(null);

    const [weekDates, setWeekDates] = useState(() => getWeekDates(currDate));

    const fetchNotes = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        const dateValues = Object.values(weekDates);
        const { data, error } = await supabase.from("user_notes").select("date, note").eq("user_id", userId).in("date", dateValues);
        if (!error) setNotes(data.reduce((acc, { date, note }) => ({ ...acc, [date]: note }), {}));
        setLoading(false);
    }, [userId, weekDates]);

    useEffect(() => { fetchNotes(); }, [fetchNotes]);

    const handleNoteChange = (date, newNote) => setNotes(prev => (prev[date] === newNote ? prev : { ...prev, [date]: newNote }));

    const debouncedNotes = useDebounce(notes, 500);

    useEffect(() => {
        if (!userId) return;
        Object.entries(debouncedNotes).forEach(async ([date, note]) => {
            if (note.trim() === "") {
                await supabase.from("user_notes").delete().eq("user_id", userId).eq("date", date);
            } else {
                const { data } = await supabase.from("user_notes").select("id").eq("user_id", userId).eq("date", date).single();
                data ? await supabase.from("user_notes").update({ note }).eq("user_id", userId).eq("date", date) : await supabase.from("user_notes").insert([{ user_id: userId, date, note }]);
            }
        });
    }, [debouncedNotes]);

    const navigateWeek = useCallback((direction) => {
        const newDate = new Date(Object.values(weekDates)[0]);
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        setWeekDates(getWeekDates(newDate));
    }, [weekDates]);

    if (loading) return <MyAnimation />;

    return (
        <div ref={containerRef}>
            <DatePicker selectedDate={currDate} setSelectedDate={(date) => {
                if (date) {
                    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                    setCurrDate(newDate);
                    setWeekDates(getWeekDates(newDate));
                }
            }} />
            <div className="navigation-container">
                <button className="nav-button" onClick={() => navigateWeek('prev')}><ChevronLeft size={24} /></button>
                <button className="nav-button" onClick={() => navigateWeek('next')}><ChevronRight size={24} /></button>
            </div>
            <div className="flex-container">
                {[days.slice(0, 3), days.slice(3)].map((column, i) => (
                    <div key={i} className={i === 0 ? "columnLeft" : "columnRight"}>
                        {column.map((day) => (
                            <div key={day} className="editor-container">
                                <h4 className="days">{day}<span className="date-display">{formatDate(weekDates[day])}</span></h4>
                                <TiptapEditor
                                    key={weekDates[day]}
                                    content={notes[weekDates[day]] ?? ''}
                                    onFocus={() => setActiveEditor(day)}
                                    onUpdate={(newContent) => handleNoteChange(weekDates[day], newContent)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {activeEditor && <BottomBar bgColor="#ff0000">
                <MainButton text="Bold" onClick={() => activeEditor.chain().focus().toggleBold().run()} />
                <SecondaryButton text="Cancel" onClick={() => activeEditor.chain().focus().toggleItalic().run()} />
            </BottomBar>}
        </div>
    );
};

export default App; //оптимизированная версия chatgpt, стили пропали но вроде стало шустрее
*/



/*
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import WebApp from "@twa-dev/sdk";
import '@/index.css';
import { supabase } from "./supabaseClient.js";
import { Bold, ChevronLeft, ChevronRight, Italic, Underline } from 'lucide-react';
import MyAnimation from "@/Loader.jsx";
import DatePicker from "@/DatePicker.jsx";
import { BottomBar, MainButton, SecondaryButton } from '@twa-dev/sdk/react';
import TiptapEditor from "@/TiptapEditor.jsx";

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

function App() {
    // Parse user data once
    const params = useMemo(() => new URLSearchParams(WebApp.initData), []);
    const user = useMemo(() => JSON.parse(params.get("user") || "{}"), [params]);
    const userId = useMemo(() => user?.id || null, [user]);

    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [currDate, setCurrDate] = useState(new Date());
    const [notes, setNotes] = useState({});
    const [loading, setLoading] = useState(true);
    const [bottomPosition, setBottomPosition] = useState(0);
    const [activeEditor, setActiveEditor] = useState(null);

    // Memoize refs
    const containerRef = useRef(null);
    const tiptapEditorRef = useRef(null);

    // Memoize utility functions
    const getWeekDates = useCallback((date) => {
        const monday = new Date(date);
        monday.setDate(date.getDate() - (date.getDay() || 7) + 1);
        const weekDates = {};
        days.forEach((day, index) => {
            const currentDate = new Date(monday);
            currentDate.setDate(monday.getDate() + index);
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const dayy = String(currentDate.getDate()).padStart(2, '0');
            weekDates[day] = `${year}-${month}-${dayy}`;
        });
        return weekDates;
    }, []);

    const formatDate = useCallback((dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
    }, []);

    // Memoize date calculations
    const weekDates = useMemo(() => getWeekDates(currDate), [currDate, getWeekDates]);
    const prevWeekDate = useMemo(() => getWeekDates(new Date(currDate.getTime() - 7 * 24 * 60 * 60 * 1000)), [currDate, getWeekDates]);
    const prev2WeekDate = useMemo(() => getWeekDates(new Date(currDate.getTime() - 14 * 24 * 60 * 60 * 1000)), [currDate, getWeekDates]);
    const nextWeekDate = useMemo(() => getWeekDates(new Date(currDate.getTime() + 7 * 24 * 60 * 60 * 1000)), [currDate, getWeekDates]);
    const next2WeekDate = useMemo(() => getWeekDates(new Date(currDate.getTime() + 14 * 24 * 60 * 60 * 1000)), [currDate, getWeekDates]);

    // Memoize column splits
    const columnLeft = useMemo(() => days.slice(0, 3), []);
    const columnRight = useMemo(() => days.slice(3), []);

    const fetchNotesForWeek = useCallback(async (weekDates) => {
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
            setNotes(prevNotes => {
                const updatedNotes = { ...prevNotes };
                data.forEach(({ date, note }) => {
                    updatedNotes[date] = note;
                });
                return updatedNotes;
            });
        }
    }, [userId]);

    const handleNoteChange = useCallback((date, newNote) => {
        setNotes(prevNotes => {
            if (prevNotes[date] === newNote) return prevNotes;
            return { ...prevNotes, [date]: newNote };
        });
    }, []);

    const navigateWeek = useCallback(async (direction) => {
        const newCurrentWeek = new Date(Object.values(weekDates)[0]);

        if (direction === "next") {
            const newNext2WeekDate = getWeekDates(new Date(newCurrentWeek.getTime() + 21 * 24 * 60 * 60 * 1000));
            setCurrDate(new Date(newCurrentWeek.getTime() + 7 * 24 * 60 * 60 * 1000));
            await fetchNotesForWeek(newNext2WeekDate);
        } else {
            const newPrev2WeekDate = getWeekDates(new Date(newCurrentWeek.getTime() - 21 * 24 * 60 * 60 * 1000));
            setCurrDate(new Date(newCurrentWeek.getTime() - 7 * 24 * 60 * 60 * 1000));
            await fetchNotesForWeek(newPrev2WeekDate);
        }
    }, [weekDates, fetchNotesForWeek, getWeekDates]);

    const handleDatePickerChange = useCallback((date) => {
        if (date) {
            const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            setCurrDate(new Date(localDate));
        }
    }, []);

    // Initial data fetch
    useEffect(() => {
        const fetchInitialNotes = async () => {
            setLoading(true);
            const dateValues = [
                ...Object.values(prev2WeekDate),
                ...Object.values(prevWeekDate),
                ...Object.values(weekDates),
                ...Object.values(nextWeekDate),
                ...Object.values(next2WeekDate)
            ];

            const { data, error } = await supabase
                .from("user_notes")
                .select("date, note")
                .eq("user_id", userId)
                .in("date", dateValues);

            if (error) {
                console.error("Ошибка загрузки данных:", error);
            } else {
                const fetchedNotes = {};
                data.forEach(({ date, note }) => {
                    fetchedNotes[date] = note;
                });
                setNotes(fetchedNotes);
            }
            setLoading(false);
        };

        fetchInitialNotes();
    }, [userId, currDate, prev2WeekDate, prevWeekDate, weekDates, nextWeekDate, next2WeekDate]);

    function smoothTranslateY(element, targetY, duration = 300) {
        if (!element) return;

        const startY = element.__currentY || 0; // Кешируем текущую позицию
        const startTime = performance.now();

        element.style.willChange = 'transform'; // Подсказка браузеру

        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const newY = startY + (targetY - startY) * easedProgress;

            element.style.transform = `translate3d(0, ${newY}px, 0)`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.willChange = ''; // Сбрасываем после завершения
            }

            element.__currentY = newY; // Обновляем кеш
        }

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        requestAnimationFrame(animate);
    }

    // Handle keyboard events
    useEffect(() => {
        const handleFocus = (event) => {
            const target = event.target;
            const editorContainer = target.closest('.editor-container');

            if (editorContainer) {
                const rect = editorContainer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const keyboardHeight = viewportHeight * 0.52;
                const bottomPosition = rect.bottom;
                const visibleHeight = viewportHeight - keyboardHeight;

                if (bottomPosition > visibleHeight) {
                    const scrollAmount = bottomPosition - visibleHeight;
                    if (containerRef.current) {
                        smoothTranslateY(containerRef.current, -scrollAmount);
                    }
                } else {
                    setBottomPosition(0);
                }
            }
        };

        const handleBlur = (event) => {
            if (containerRef.current && containerRef.current.contains(event.relatedTarget)) {
                return;
            }
            if (containerRef.current) {
                smoothTranslateY(containerRef.current, 0);
                setIsKeyboardOpen(false);
            }
        };

        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);

        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        };
    }, []);

    // Set CSS variables
    useEffect(() => {
        const root = document.documentElement;
        if (!root.style.getPropertyValue("--tile-size")) {
            root.style.setProperty("--tile-size", `${33 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--height", `${30 * (window.innerHeight * 0.8 / 100)}px`);
            root.style.setProperty("--gap-size", `${2 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--padding", `${1 * (window.innerWidth / 100)}px`);
        }
    }, []);

    // Render optimized component
    return loading ? <MyAnimation /> : (
        <div ref={containerRef}>
            <DatePicker
                selectedDate={currDate}
                setSelectedDate={handleDatePickerChange}
            />
            <div className="navigation-container">
                <button
                    className="nav-button"
                    onClick={() => navigateWeek('prev')}
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    className="nav-button"
                    onClick={() => navigateWeek('next')}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            <div className="flex-container">
                <div className="columnLeft">
                    {columnLeft.map((day, index) => (
                        <div key={`${weekDates[day]}-${index}`} className={`left-flex-item-${index}`}>
                            <div className="editor-container">
                                <h4 className="days">
                                    {day}
                                    <span className="date-display">
                                        {weekDates[day] && formatDate(weekDates[day])}
                                    </span>
                                </h4>
                                <div className="Editor">
                                    <TiptapEditor
                                        key={weekDates[day]}
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
                        <div key={`${weekDates[day]}-${index}`} className={`right-flex-item-${index}`}>
                            <div className="editor-container">
                                <h4 className="days">
                                    {day}
                                    <span className="date-display">
                                        {weekDates[day] && formatDate(weekDates[day])}
                                    </span>
                                </h4>
                                <div className="Editor">
                                    <TiptapEditor
                                        key={weekDates[day]}
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
            </div>
            {activeEditor && (
                <BottomBar bgColor="#ff0000">
                    <MainButton
                        text="Bold"
                        onClick={() => activeEditor.chain().focus().toggleBold().run()}
                        className={activeEditor.isActive('bold') ? 'is-active' : ''}
                    />
                    <SecondaryButton
                        text="Cancel"
                        position="bottom"
                        onClick={() => activeEditor.chain().focus().toggleItalic().run()}
                        className={activeEditor.isActive('italic') ? 'is-active' : ''}
                    />
                </BottomBar>
            )}
        </div>
    );
}

export default App;*/ //оптимизированная версия bolt, стили не пропали но шустрее не стало


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
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder';
import {ToggleGroupDemo} from "@/ToggleGroupDemo.jsx";
//import BottomBar from "@/BottomBar.jsx";
import StickyBottomBar from "./StickyBottomBar.jsx";

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
            <button onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}>
                Bold
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}>
                Italic
            </button>
            <button onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}>
                Strike
            </button>
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

    //вычисляю 5 недель для первого фетча
    const [weekDates, setWeekDates] = useState(getWeekDates(new Date (currDate)));
    const [prevWeekDate, setPrevWeekDate] = useState(getWeekDates(new Date(currDate.getTime() - 7 * 24 * 60 * 60 * 1000)));
    const [prev2WeekDate, setPrev2WeekDate] = useState(getWeekDates(new Date(currDate.getTime() - 14 * 24 * 60 * 60 * 1000)));
    const [nextWeekDate, setNextWeekDate] = useState(getWeekDates(new Date(currDate.getTime() + 7 * 24 * 60 * 60 * 1000)));
    const [next2WeekDate, setNext2WeekDate] = useState(getWeekDates(new Date(currDate.getTime() + 14 * 24 * 60 * 60 * 1000)));

    const [activeEditor, setActiveEditor] = useState(null);

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

/*
    function smoothTranslateY(element, targetY, duration = 300) {
        if (!element) return;

        const startY = element.__currentY || 0; // Кешируем текущую позицию
        const startTime = performance.now();

        element.style.willChange = 'transform'; // Подсказка браузеру

        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const newY = startY + (targetY - startY) * easedProgress;

            element.style.transform = `translate3d(0, ${newY}px, 0)`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.willChange = ''; // Сбрасываем после завершения
            }

            element.__currentY = newY; // Обновляем кеш
        }

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        requestAnimationFrame(animate);
    }
*/

    useEffect(() => {
        const handleFocus = (event) => {
            const target = event.target;
            const editorContainer = target.closest('.editor-container');

            if (editorContainer) {
                const rect = editorContainer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const keyboardHeight = viewportHeight * 0.45; // 45% от экрана — примерная высота клавиатуры
                const bottomPosition1 = rect.bottom;
                //console.log(rect.bottom);
                const visibleHeight = viewportHeight - keyboardHeight;
                setBottomPosition(0);

                if (bottomPosition > visibleHeight) {
                    const scrollAmount = bottomPosition1 - visibleHeight;
                    if (containerRef.current) {
                       containerRef.current.style.transform = `translateY(-${scrollAmount}px)`;
                        //smoothTranslateY(containerRef.current, -scrollAmount);
                        //const bottombarPos = WebApp.viewportHeight;
                        setBottomPosition(scrollAmount);
                    }
                } else {
                    console.log(rect.bottom);
                    //setBottomPosition(0);
                }
            }
        };

        const handleBlur = () => {
            if (containerRef.current) {
                containerRef.current.style.transform = 'translateY(0)';
                setBottomPosition(0);
                const sadx = WebApp.viewportStableHeight;
                //setIsKeyboardOpen(false);
            }
        };
/*        const handleBlur = (event) => {
            if (
                containerRef.current &&
                containerRef.current.contains(event.relatedTarget)
            ) {
                return; // НЕ убираем `StickyBottomBar`, если кликнули на него
            }
            if (containerRef.current) {
                containerRef.current.style.transform = 'translateY(0)';
                setIsKeyboardOpen(false);
            }
        };*/

        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);

        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        };
    }, []);

    useEffect(() => {
        let lastFocusedElement = null;

        const handleFocus = (event) => {
            const target = event.target;
            const editorContainer = target.closest('.editor-container');

            if (editorContainer) {
                if (lastFocusedElement && lastFocusedElement !== target) {
                    handleBlur({ target: lastFocusedElement }); // Вручную вызываем blur для предыдущего элемента
                }

                lastFocusedElement = target; // Запоминаем текущий элемент
                const rect = editorContainer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const keyboardHeight = viewportHeight * 0.45; // Примерная высота клавиатуры
                const bottomPosition = rect.bottom;
                const visibleHeight = viewportHeight - keyboardHeight;

                if (bottomPosition > visibleHeight) {
                    const scrollAmount = bottomPosition - visibleHeight;
                    if (containerRef.current) {
                        containerRef.current.style.transform = `translateY(-${scrollAmount}px)`;
                        // smoothTranslateY(containerRef.current, -scrollAmount);
                        // setBottomPosition(scrollAmount);
                    }
                } else {
                    console.log(rect.bottom);
                    // setBottomPosition(0);
                }
            }
        };

        const handleBlur = (event) => {
            if (!event.target.closest('.editor-container')) {
                if (containerRef.current) {
                    containerRef.current.style.transform = 'translateY(0)';
                    //setIsKeyboardOpen(false);
                }
                lastFocusedElement = null;
            }
        };

        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);

        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        };
    }, []);

    /*useEffect(() => {
        const handleFocus = (event) => {
            const target = event.target;
            const editorContainer = target.closest('.editor-container');

            if (activeEditor){
                const rect = editorContainer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const keyboardHeight = viewportHeight * 0.45; // 45% от экрана — примерная высота клавиатуры
                const bottomPosition = rect.bottom;
                console.log(rect.bottom);
                const visibleHeight = viewportHeight - keyboardHeight;

            }


        }
    }, []);
*/
    useEffect(() => {
        const root = document.documentElement;

        if (!root.style.getPropertyValue("--tile-size")) {
            root.style.setProperty("--tile-size", `${33 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--height", `${30 * (window.innerHeight * 0.8 / 100)}px`);
            root.style.setProperty("--gap-size", `${2 * (window.innerWidth / 100)}px`);
            root.style.setProperty("--padding", `${1 * (window.innerWidth / 100)}px`);
        }
    }, []);

    const columnLeft = days.slice(0, 3);
    const columnRight = days.slice(3);
    console.log("App re-rendered");
    console.count('App re-rendered');
    return loading ? <MyAnimation/> : (
        <div className="" ref={containerRef}>

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
                <button
                    className="nav-button"
                    onClick={() => navigateWeek('next')}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            {WebApp.viewportStableHeight}
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
      /*           <BottomBar bgColor="#ff0000" >
                    <MainButton text="Bold" onClick={() => activeEditor.chain().focus().toggleBold().run()}
                                className={activeEditor.isActive('bold') ? 'is-active' : ''} />
                    <SecondaryButton text="Cancel" position="bottom" onClick={() => activeEditor.chain().focus().toggleItalic().run()}
                                     className={activeEditor.isActive('italic') ? 'is-active' : ''} />
                </BottomBar>}*/

               <StickyBottomBar /*scrollAmount={bottomPosition}*/ >
                   <ToggleGroup variant="outline" type="multiple">
                        <ToggleGroupItem value="bold" aria-label="Toggle bold">
                            <Bold className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Toggle italic">
                            <Italic className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="underline" aria-label="Toggle underline">
                            <Underline className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </StickyBottomBar>}
        </div>
    );
}

export default App;   //моя последняя актуальная версия с ререндерами