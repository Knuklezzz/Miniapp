/*
import React, { useEffect, useState } from 'react';

const StickyBottomBar = ({ scrollAmount = 0, children}) => {

    return (
        <div
            /!*className="fixed left-0 w-full bg-gray-800 p-4 text-white text-center transition-transform duration-300"*!/
            className="fixed left-0 w-full bg-gray-800 p-4 text-white text-center transition-transform duration-300"
            style={{
                bottom: `calc(100vh - var(--tg-viewport-stable-height) + ${scrollAmount}px)`
                /!*marginBottom: `calc(100vh - var(--tg-viewport-height) + 50px)`*!/
            }}
            //onMouseDown={(e) => e.preventDefault()} // Предотвращаем потерю фокуса
        >
{/!*            <p>Это BottomBar</p>
            `${scrollAmount}px`*!/}

            {children}
        </div>
    );
};

export default StickyBottomBar;
*/


/*
import React, { useEffect, useRef, useState } from 'react';
import WebApp from "@twa-dev/sdk";
import '@/index.css';

const StickyBottomBar = ({ scrollAmount, children }) => {

    return (
        <div
            className="fixed left-0 w-full bg-gray-800 p-4 text-white text-center transition-transform duration-300"
            style={{
                bottom: `100vh - var(--tg-viewport-stable-height)` }}
        >

            {children}
        </div>
    );
};

export default StickyBottomBar;

*/
import React from 'react';

const StickyBottomBar = ({ scrollAmount = 0, children}) => {

    return (
        <div
            className="fixed left-0 w-full p-4 bg-gray-800 text-white text-center transition-transform duration-1000"
            style={{
                bottom: `calc(100% - var(--tg-viewport-stable-height) - ${scrollAmount}px)`,
                marginBottom:0,
                paddingBottom: 0
            }}
            //onMouseDown={(e) => e.preventDefault()} // Предотвращаем потерю фокуса
        >
            {children}
        </div>
    );
};

export default StickyBottomBar;
/*
import React, { useEffect, useState } from "react";

const StickyBottomBar = ({ scrollAmount = 0, children }) => {
    const [bottomValue, setBottomValue] = useState("0px");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBottomValue(`calc(100vh - var(--tg-viewport-stable-height) - ${scrollAmount}px)`);
            setIsVisible(true);
        }, 100); // Небольшая задержка

        return () => clearTimeout(timer);
    }, [scrollAmount]);

    return (
        <div
            className={`fixed left-0 w-full p-4 text-white text-center transition-all duration-500 
                        bg-black bg-opacity-50 rounded-t-2xl shadow-lg ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{
                bottom: bottomValue,
                marginBottom: 0,
                paddingBottom: 0,
            }}
        >
            {children}
        </div>
    );
};

export default StickyBottomBar;*/
