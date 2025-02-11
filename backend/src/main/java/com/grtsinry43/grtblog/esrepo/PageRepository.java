//package com.grtsinry43.grtblog.esrepo;
//
//import com.grtsinry43.grtblog.esdao.PageDocument;
//import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
//
//import java.util.List;
//
///**
// * @author grtsinry43
// * @date 2024/11/23 18:33
// * @description 热爱可抵岁月漫长
// */
//public interface PageRepository extends ElasticsearchRepository<PageDocument, Long> {
//    List<PageDocument> findByTitleContainingOrContentContainingOrDescriptionContaining(String title, String content, String description);
//}
