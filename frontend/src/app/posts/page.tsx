import React from 'react';
import { Container } from '@radix-ui/themes';
import { getAllArticlesByPage } from '@/api/article';
import ArticlePageItem, { ArticlePreview } from '@/components/article/ArticlePageItem';
import { noto_sans_sc } from '@/app/fonts/font';

const AllPostPage = async () => {
  const res = await getAllArticlesByPage(1);

  return (
    <Container
      className={noto_sans_sc.className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
      }} size={'2'}>
      {res && res.map((item: ArticlePreview) => {
        return <ArticlePageItem post={item} key={item.id} />;
      })}
    </Container>
  );
};

export default AllPostPage;
