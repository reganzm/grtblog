//package com.grtsinry43.grtblog.util;
//
//import java.io.File;
//import java.lang.reflect.Method;
//import java.net.URL;
//
///**
// * @author grtsinry43
// * @date 2024/11/2 23:58
// * @description 热爱可抵岁月漫长
// */
//public class IPLocationUtil {
//
//    public static String getAddressByIp(String ip) {
//        try {
//            // 首先是加载 ip2region 的数据库文件
//            URL url = IPLocationUtil.class.getClassLoader().getResource("ip2region.xdb");
//            if (url == null) {
//                System.out.println("Error: 无法加载 ip2region.xdb 文件");
//                return "fail";
//            }
//            String dbPath = url.getFile();
//            File file = new File(dbPath);
//            if (!file.exists()) {
//                System.out.println("Error: ip2region.xdb 文件不存在");
//                return "fail";
//            }
//
//            // 这里是定义搜索算法
//            int algorithm = DbSearcher.BTREE_ALGORITHM; // B-tree
//            // int algorithm = DbSearcher.BINARY_ALGORITHM; // Binary
//            // int algorithm = DbSearcher.MEMORY_ALGORITYM; // Memory
//
//            // Initialize the DbSearcher
//            DbConfig config = new DbConfig();
//            DbSearcher searcher = new DbSearcher(config, dbPath);
//
//            // Define the search method based on the algorithm
//            Method method = null;
//            switch (algorithm) {
//                case DbSearcher.BTREE_ALGORITHM:
//                    method = searcher.getClass().getMethod("btreeSearch", String.class);
//                    break;
//                case DbSearcher.BINARY_ALGORITHM:
//                    method = searcher.getClass().getMethod("binarySearch", String.class);
//                    break;
//                case DbSearcher.MEMORY_ALGORITYM:
//                    method = searcher.getClass().getMethod("memorySearch", String.class);
//                    break;
//            }
//
//            // Validate the IP address
//            if (!Util.isIpAddress(ip)) {
//                System.out.println("Error: Invalid IP address");
//                return "fail";
//            }
//
//            // Perform the search
//            DataBlock dataBlock = (DataBlock) method.invoke(searcher, ip);
//            String address = dataBlock.getRegion();
//
//            // Return the address
//            return address;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "fail";
//        }
//    }
//}
