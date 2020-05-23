-- MySQL dump 10.13  Distrib 5.5.23, for Win64 (x86)
--
-- Host: 127.0.0.1    Database: cashback
-- ------------------------------------------------------
-- Server version	5.5.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `url` text NOT NULL,
  `apiUrl` varchar(500) NOT NULL,
  `logo` text NOT NULL,
  `referalLink` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Backit','https://backit.me','https://app.epn.bz','https://backit.me/cashback-assets/img/f37356a.svg','https://goodsbuy.by/redirect/cpa/o/q8ubg1zq0isbjyd5nwyso7taovlldoej/'),(2,'Letyshops','https://letyshops.com','https://eapi.letyshops.com','https://letyshops.com/build/core/images/logo.73c32bad050da62d938f713a19db208d.svg','https://lite.al/ImpTgR'),(3,'Kopikot','https://kopikot.ru','https://s3-eu-west-1.amazonaws.com','https://s3-eu-west-1.amazonaws.com/s3bonusbay/assets/img/kopikot_nega.png','https://www.kopikot.ru/get-money/?pr=1008187'),(4,'Cash4Brands','https://cash4brands.ru/','https://cash4brands.ru/api','https://cash4brands.ru/static/img/logo_new.png','https://lite.bz/Ctuuk'),(5,'Megabonus','https://megabonus.com/','https://megabonus.com/extensions2_1','https://cdn.megabonus.com/images/bg-logo-ru.png','https://tds.megabonus.com/invite_a_friend_ru?u=2142460'),(6,'SecretDiscounter','https://secretdiscounter.com/ru','https://api.secretdiscounter.com','https://secretdiscounter.com/images/svg/mini-logo-2.svg','https://secretdiscounter.com/ru'),(7,'Skidka','https://skidka.ru','https://skidka.ru','https://skidka.ru/assets/svg/plugin/icon.svg','https://skidka.ru');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-08 18:32:35
