import React from 'react';
import { Container } from '@radix-ui/themes';
import { getAllArticlesByPage } from '@/api/article';
import ArticlePageItem, { ArticlePreview } from '@/components/article/ArticlePageItem';

const AllPostPage = async () => {
  const res = await getAllArticlesByPage(1);

  return (
    <Container size={'4'}>
      {res && res.map((item: ArticlePreview) => {
        return <ArticlePageItem post={item} key={item.id} />;
      })}
    </Container>
  );
};

export default AllPostPage;
