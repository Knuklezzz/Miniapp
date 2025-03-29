import React, { useEffect, useState } from 'react';

const StickyBottomBar = ({ scrollAmount, children}) => {

    return (
        <div
            /*className="fixed left-0 w-full bg-gray-800 p-4 text-white text-center transition-transform duration-300"*/
            className="fixed left-0 w-full  bg-gray-800"
            style={{
                bottom: `calc(100vh - var(--tg-viewport-stable-height) )`
                /*marginBottom: `calc(100vh - var(--tg-viewport-height) + 50px)`*/
            }}
            onMouseDown={(e) => e.preventDefault()} // Предотвращаем потерю фокуса
        >
{/*            <p>Это BottomBar</p>
            `${scrollAmount}px`*/}
            {children}
        </div>
    );
};

export default StickyBottomBar;
