"use client";

import React, {useState} from "react"
import {motion} from "framer-motion"
import {Text} from "@radix-ui/themes"
import {Calendar} from "lucide-react"
import PhotoItem from "./PhotoItem"
import {PhotoPreview} from "@/components/album/AlbumFlowClient";
import AlbumView from "@/components/album/AlbumView";

interface PhotoGroupProps {
    date: string
    photos: PhotoPreview[]
    lastPhotoRef: (node: HTMLDivElement | null) => void
}

const PhotoGroup: React.FC<PhotoGroupProps> = ({date, photos, lastPhotoRef}) => {
    const [isOpened, setIsOpened] = useState(false)
    const [curPhoto, setCurPhoto] = useState<PhotoPreview | null>(null)
    const prevHandler = () => {
        const index = photos.indexOf(curPhoto!)
        if (index > 0) {
            setCurPhoto(photos[index - 1])
        }
    }

    const nextHandler = () => {
        const index = photos.indexOf(curPhoto!)
        if (index < photos.length - 1) {
            setCurPhoto(photos[index + 1])
        }
    }

    return (
        <>
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{type: "spring", stiffness: 100, damping: 10}}
            >
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <Calendar width={16} height={16} className="inline-block mr-2"/>
                        <Text className="text-lg font-semibold">{date}</Text>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                        {photos.map((photo, index) => (
                            <PhotoItem key={photo.id} photo={photo}
                                       setIsOpened={(isOpen) => {
                                           setCurPhoto(photo)
                                           setIsOpened(isOpen)
                                       }}
                                       ref={index === photos.length - 1 ? lastPhotoRef : undefined}/>
                        ))}
                    </div>
                </div>
            </motion.div>
            {
                isOpened && curPhoto && (
                    <AlbumView photo={curPhoto} isOpen={isOpened} setIsOpen={setIsOpened}
                               prevHandler={prevHandler} nextHandler={nextHandler}
                               prevDisabled={photos.indexOf(curPhoto) === 0}
                               nextDisabled={photos.indexOf(curPhoto) === photos.length - 1}
                    />
                    // <ZoomedImage src={photo.url} alt={`Photo from ${photo.date}`} onClose={()=> setIsOpened(false)}/>
                )
            }</>
    )
}

export default PhotoGroup

