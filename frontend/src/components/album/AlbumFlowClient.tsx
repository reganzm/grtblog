"use client"

import type React from "react"
import {useEffect, useRef, useState, useCallback} from "react"
import {Skeleton} from "@radix-ui/themes"
import {Calendar} from "lucide-react"
import PhotoGroup from "./PhotoGroup"
import {fetchPhotosByPage} from "@/api/photos"

export type PhotoPreview = {
    id: string
    date: string
    description: string
    location: string
    device: string
    metadata: string
    url: string
    shade: string // 这个是算出来的模糊背景色，用于占位，格式为 #RRGGBB
}

const AlbumFlowClient: React.FC<{ initialImages: PhotoPreview[] }> = ({initialImages}) => {
    const [photoGroups, setPhotoGroups] = useState<Record<string, PhotoPreview[]>>({})
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        groupPhotosByDate(initialImages)
    }, [initialImages])

    const lastPhotoElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMorePhotos()
                }
            })
            if (node) observer.current.observe(node)
        },
        [loading, hasMore],
    )

    const loadMorePhotos = () => {
        setLoading(true)
        fetchPhotosByPage(page + 1, 10).then((newPhotos) => {
            groupPhotosByDate(newPhotos)
            setPage((prevPage) => prevPage + 1)
            setHasMore(newPhotos.length > 0)
            setLoading(false)
        })
    }

    const groupPhotosByDate = (photos: PhotoPreview[]) => {
        setPhotoGroups((prevGroups) => {
            const newGroups = {...prevGroups}
            photos.forEach((photo) => {
                const date = new Date(photo.date).toLocaleDateString()
                if (!newGroups[date]) {
                    newGroups[date] = []
                }
                newGroups[date].push(photo)
            })
            return newGroups
        })
    }

    return (
        <>
            {Object.entries(photoGroups).map(([date, photos]) => (
                <PhotoGroup key={date} date={date} photos={photos} lastPhotoRef={lastPhotoElementRef}/>
            ))}
            {loading && <LoadingSkeleton/>}
            {!hasMore && (
                <div>
                    <div className="text-center text-gray-500 text-sm mt-2 mb-6"> 没有更多照片啦，不小心让你翻到底了欸
                        〃•ω‹〃
                    </div>
                    <div className="text-center text-gray-500 text-sm mt-2 mb-6">
                        本站所有照片均为原创，未经授权禁止转载
                    </div>
                </div>
            )}
        </>
    )
}

const LoadingSkeleton: React.FC = () => (
    <div className="mb-8">
        <div className="flex items-center mb-4">
            <Calendar width={16} height={16} className="inline-block mr-2"/>
            <Skeleton className="h-6 w-32"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="aspect-[4/3] rounded-lg h-[100%] w-[100%]"/>
            ))}
        </div>
    </div>
)

export default AlbumFlowClient

