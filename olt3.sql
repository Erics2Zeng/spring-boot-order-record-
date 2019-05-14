/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : olt3

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 14/05/2019 23:42:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (1, '小牛', '13234234243', '');
INSERT INTO `customer` VALUES (2, '张三', '1232234234', NULL);
INSERT INTO `customer` VALUES (3, '李四', '131343131', NULL);
INSERT INTO `customer` VALUES (4, '131', '314', '114');
INSERT INTO `customer` VALUES (5, '小刚', '13367884939', '');

-- ----------------------------
-- Table structure for model
-- ----------------------------
DROP TABLE IF EXISTS `model`;
CREATE TABLE `model`  (
  `customerId` int(8) NOT NULL,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` double(8, 2) NULL DEFAULT NULL,
  `count` double(16, 0) NULL DEFAULT NULL,
  `unit` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `totalPrice` double(16, 2) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of model
-- ----------------------------
INSERT INTO `model` VALUES (1, '白菜', 2.00, 34, '斤', 1.00);
INSERT INTO `model` VALUES (1, '土豆', 1.00, 11, '斤', 1.00);
INSERT INTO `model` VALUES (1, '仔姜', 5.60, 37, '件', 112231.00);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(24) NOT NULL AUTO_INCREMENT,
  `userId` int(24) NOT NULL,
  `customerId` int(8) NOT NULL,
  `productName` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createTime` date NULL DEFAULT NULL,
  `count` double(8, 0) NULL DEFAULT NULL,
  `unit` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` double(8, 2) NULL DEFAULT NULL,
  `totalPrice` double(12, 0) NULL DEFAULT NULL,
  `isPayed` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 198 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (3, 1, 1, '芹菜', '2019-05-09', 1, '1', 1.00, 1, 0);
INSERT INTO `orders` VALUES (45, 1, 2, '黄瓜', '2019-05-09', 1, '1', 1.00, 1, 1);
INSERT INTO `orders` VALUES (65, 1, 1, '白菜', '2019-05-10', 1, '1', 3.00, 0, 1);
INSERT INTO `orders` VALUES (66, 1, 1, '土豆', '2019-05-10', 2, '斤', 2.50, 5, 1);
INSERT INTO `orders` VALUES (67, 1, 1, '西芹', '2019-05-10', 1, '斤', 23.00, 23, 0);
INSERT INTO `orders` VALUES (188, 1, 1, '白菜', '2019-05-13', 34, '斤', 1.00, 1, 0);
INSERT INTO `orders` VALUES (189, 1, 1, '土豆', '2019-05-13', 11, '斤', 1.00, 1, 0);
INSERT INTO `orders` VALUES (190, 1, 1, '仔姜', '2019-05-13', 37, '件', 1.00, 112231, 1);
INSERT INTO `orders` VALUES (191, 1, 1, '黄瓜', '2019-05-13', 1, '斤', 1.00, 1, 0);
INSERT INTO `orders` VALUES (192, 1, 1, '罗博', '2019-05-13', 21, '斤', 1.00, 1, 0);
INSERT INTO `orders` VALUES (193, 1, 1, '丝瓜', '2019-05-13', 5, '斤', 1.00, 0, 0);
INSERT INTO `orders` VALUES (194, 1, 1, '', '2019-05-13', 8, '', NULL, 0, 0);
INSERT INTO `orders` VALUES (195, 1, 1, '', '2019-05-13', NULL, '', NULL, 0, 0);
INSERT INTO `orders` VALUES (196, 1, 1, '', '2019-05-13', NULL, '', NULL, 0, 0);
INSERT INTO `orders` VALUES (197, 1, 1, '', '2019-05-13', NULL, '', NULL, 0, 0);
INSERT INTO `orders` VALUES (198, 0, 1, '白菜', '2019-05-14', 34, '斤', 2.00, 1, 0);
INSERT INTO `orders` VALUES (199, 0, 1, '土豆', '2019-05-14', 11, '斤', 1.00, 1, 0);
INSERT INTO `orders` VALUES (200, 0, 1, '仔姜', '2019-05-14', 37, '件', 1.00, 1, 0);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(31) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(31) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `nick_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sex` int(1) NULL DEFAULT NULL,
  `register_date` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('0', '864463611@qq.com', '111111', 'ericzeng', 2, '2018-11-26 13:42:39');
INSERT INTO `user` VALUES ('1', '111@qq.com', '111111', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
