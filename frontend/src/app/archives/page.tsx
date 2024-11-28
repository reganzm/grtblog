import React from 'react';
import {article_font, noto_sans_sc_bold, noto_serif_sc_bold, varela_round} from '@/app/fonts/font';
import {clsx} from 'clsx';
import {getArchives} from '@/api/archive';
import {ArticleArchive, StatusUpdateArchive, YearlyArchive} from '@/types';
import ArchiveItem from '@/components/archive/ArchiveItem';
import {Metadata} from "next";

type Archives = YearlyArchive[];

export type CombinedItem = (ArticleArchive | StatusUpdateArchive) & { type: 'article' | 'status'; year: number };

export const metadata: Metadata = {
    title: '回忆与归档 - Archives',
    description: '岁月绵长，山高路远，蓦然回首，我们也曾在这里留下过足迹。',
}

const ArchivePage = async () => {
    const archives: Archives = await getArchives({next: {revalidate: 60}});
    

    const groupedItems: { [key: number]: CombinedItem[] } = {};

    Object.entries(archives).forEach(([year, yearData]) => {
        const yearNumber = parseInt(year);
        groupedItems[yearNumber] = [
            ...yearData.articles.map(article => ({...article, type: 'article' as const, year: yearNumber})),
            ...yearData.statusUpdates.map(status => ({...status, type: 'status' as const, year: yearNumber})),
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });

    const sortedYears = Object.keys(groupedItems).map(Number).sort((a, b) => b - a);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="relative text-center mb-12">
                <h1 className={clsx(noto_sans_sc_bold.className, 'text-4xl font-bold relative z-1')}>
                    回忆与归档
                </h1>
                <span
                    className={clsx(varela_round.className, 'text-6xl font-bold text-gray-100 dark:text-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10')}
                >
          ARCHIVES
        </span>
                <p className={clsx(noto_serif_sc_bold.className, 'mt-4 text-lg text-gray-600 dark:text-gray-300')}>
                    岁月绵长，山高路远，蓦然回首，我们也曾在这里留下过足迹。
                </p>
            </div>

            <div className="space-y-12">
                {sortedYears.map((year) => (
                    <div key={year} className={clsx(article_font.className, 'relative')}>
                        <h2 className={clsx(article_font.className, 'text-3xl font-bold mb-6 sticky top-4 py-2 z-10')}>
                            {year}
                        </h2>
                        <div className="space-y-6">
                            {groupedItems[year].map((item, index) => (
                                <ArchiveItem item={item} index={index} key={item.shortUrl}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArchivePage;
