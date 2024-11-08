import React, { useEffect, useState } from 'react'
import TextTransition, { presets } from 'react-text-transition';

export function TopSection() {
    const TEXTS = ['Book', 'Author', 'ISBN', 'Person', 'Genre']
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => prevIndex + 1)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <h2 className="text-[80px] h-40 flex text-gray-800 mb-4" style={{fontFamily: 'fantasy'}}>Search for 
            <TextTransition springConfig={presets.wobbly} className='w-40 ml-8'>
                <p className='text-[80px] font-bold text-gray-400'>{TEXTS[index % TEXTS.length]}</p>
            </TextTransition>
        </h2>
    )
}