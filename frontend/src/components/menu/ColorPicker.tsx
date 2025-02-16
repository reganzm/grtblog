'use client'

import * as React from 'react'
import {Check} from 'lucide-react'

import {cn} from '@/lib/utils'
import {useEffect} from "react";

const colors = [
    {name: 'Red', value: '239, 68, 68'},
    {name: 'Orange', value: '249, 115, 22'},
    {name: 'Amber', value: '245, 158, 11'},
    {name: 'Yellow', value: '234, 179, 8'},
    {name: 'Lime', value: '132, 204, 22'},
    {name: 'Green', value: '34, 197, 94'},
    {name: 'Teal', value: '20, 184, 166'},
    {name: 'Blue', value: '59, 130, 246'},
]

export function ColorPicker() {
    const [selectedColor, setSelectedColor] = React.useState(colors[0].value)

    useEffect(() => {
        const primaryColor = localStorage.getItem('primary-color')
        if (primaryColor) {
            setSelectedColor(primaryColor)
            document.documentElement.style.setProperty('--primary', primaryColor)
        }
    }, [])

    const handleColorChange = (color: string) => {
        setSelectedColor(color)
        localStorage.setItem('primary-color', color)
        document.documentElement.style.setProperty('--primary', color)
    }

    return (
        <div className="grid grid-cols-8 gap-2">
            {colors.map((color) => (
                <button
                    key={color.value}
                    className={cn(
                        "relative w-6 h-6 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
                        selectedColor === color.value && "ring-2 ring-offset-2 ring-offset-background"
                    )}
                    style={{backgroundColor: `rgb(${color.value})`}}
                    onClick={() => handleColorChange(color.value)}
                    title={color.name}
                >
                    {selectedColor === color.value && (
                        <Check className="absolute inset-0 m-auto h-4 w-4 text-white"/>
                    )}
                </button>
            ))}
        </div>
    )
}
