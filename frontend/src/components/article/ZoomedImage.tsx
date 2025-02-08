"use client";

import type React from "react"
import {useState, useCallback, useEffect} from "react"
import Image from "next/image"
import {X} from "lucide-react"
import {createPortal} from "react-dom";

interface ZoomedImageProps {
    src: string
    alt: string
    onClose: () => void
}

const ZoomedImage: React.FC<ZoomedImageProps> = ({src, alt, onClose}) => {
    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({x: 0, y: 0})
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({x: 0, y: 0})

    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setScale((prevScale) => {
            const newScale = prevScale - e.deltaY * 0.003
            return Math.max(0.1, Math.min(newScale, 10))
        })
    }, [])

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            setIsDragging(true)
            setDragStart({x: e.clientX - position.x, y: e.clientY - position.y})
        },
        [position],
    )

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - dragStart.x,
                    y: e.clientY - dragStart.y,
                })
            }
        },
        [isDragging, dragStart],
    )

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp)
        return () => {
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [handleMouseUp])

    return createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src={src || "/placeholder.svg"}
                    alt={alt}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg transition-transform duration-200 ease-out"
                    style={{
                        transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                        cursor: isDragging ? "grabbing" : "grab",
                    }}
                    draggable={false}
                />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-colors duration-200 z-10"
                    aria-label="Close"
                >
                    <X className="w-6 h-6 text-black"/>
                </button>
            </div>
        </div>,
        document.body,
    )
}

export default ZoomedImage

