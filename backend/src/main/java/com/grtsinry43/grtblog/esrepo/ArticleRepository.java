//package com.grtsinry43.grtblog.esrepo;
//
//import com.grtsinry43.grtblog.esdao.ArticleDocument;
//import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
//
//import java.util.List;
//
///**
// * @author grtsinry43
// * @date 2024/11/23 18:36
// * @description 热爱可抵岁月漫长
// */
//public interface ArticleRepository extends ElasticsearchRepository<ArticleDocument, Long> {
//    List<ArticleDocument> findByTitleContainingOrContentContainingOrSummaryContaining(String title, String content, String summary);
//}
