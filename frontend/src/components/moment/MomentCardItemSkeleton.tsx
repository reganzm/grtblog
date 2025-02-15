import { Skeleton } from "@radix-ui/themes"

const MomentCardItemSkeleton = () => {
    return (
        <div className="mb-8 flex justify-between items-center w-full">
            <div className="w-full z-10 bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-row items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-grow">
                        <Skeleton className="h-5 w-1/4 mb-2" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="w-6 h-6" />
                        <Skeleton className="w-12 h-6" />
                    </div>
                </div>
                <div>
                    <Skeleton className="h-7 w-3/4 mt-6 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <Skeleton className="aspect-video rounded" />
                        <Skeleton className="aspect-video rounded" />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-4">
                            <Skeleton className="w-16 h-6" />
                            <Skeleton className="w-16 h-6" />
                            <Skeleton className="w-16 h-6" />
                            <Skeleton className="w-8 h-6" />
                        </div>
                        <Skeleton className="w-24 h-9" />
                    </div>
                </div>
            </div>
            <div className="absolute left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2" />
        </div>
    )
}

export default MomentCardItemSkeleton

