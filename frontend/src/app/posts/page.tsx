import {getAllArticlesByPage} from '@/api/article';
import {ArticlePreview} from '@/components/article/ArticlePageItem';
import {noto_sans_sc} from '@/app/fonts/font';
import AllPostPageClient from './AllPostPageClient';

export default async function AllPostPage() {
    const pageSize = 10;
    const initialArticles: ArticlePreview[] = await getAllArticlesByPage(1, pageSize, {next: {revalidate: 60}});

    return (
        <div style={{maxWidth: '850px', margin: '0 auto', padding: '2em'}}>
            <h1 style={{fontSize: '2em', fontWeight: 'bolder', marginBottom: '1em'}} className={noto_sans_sc.className}>
                全部文章
            </h1>
            <AllPostPageClient initialArticles={initialArticles}/>
        </div>
    );
}
