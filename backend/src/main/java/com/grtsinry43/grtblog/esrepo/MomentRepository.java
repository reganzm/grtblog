//package com.grtsinry43.grtblog.esrepo;
//
//import com.grtsinry43.grtblog.esdao.MomentDocument;
//import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
//
//import java.util.List;
//
///**
// * @author grtsinry43
// * @date 2024/11/23 18:35
// * @description 热爱可抵岁月漫长
// */
//public interface MomentRepository extends ElasticsearchRepository<MomentDocument, Long> {
//    List<MomentDocument> findByTitleContainingOrContentContainingOrSummaryContaining(String title, String content, String summary);
//}
