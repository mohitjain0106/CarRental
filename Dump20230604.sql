-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: paynrent
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `administrator` (
  `emailid` varchar(100) NOT NULL,
  `mobileno` varchar(45) NOT NULL,
  `adminname` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `picture` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`emailid`,`mobileno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES ('ss@gmail.com','9826488165','mohit','123',NULL);
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `categoryid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(45) DEFAULT NULL,
  `icon` text,
  PRIMARY KEY (`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Cars','206a8ed8-d818-42c3-b06a-1e233692eaa0.png'),(3,'Buses','73545ed7-4988-4aa4-b5b4-e37d1adff808.jpg'),(4,'Bikes','6020e2f3-c4fe-463f-894b-e86abbb9b204.gif');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cities` (
  `cityid` int(11) NOT NULL AUTO_INCREMENT,
  `cityname` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cityid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Indore','Top City'),(2,'Agra','Top City'),(3,'Jabalpur','Top City'),(4,'Bhopal','Top City'),(5,'Gwalior','Top City'),(6,'Kanpur','Other City'),(7,'Jhansi','Other City'),(8,'Lucknow','Other City');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company` (
  `companyid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) DEFAULT NULL,
  `subcategoryid` varchar(45) DEFAULT NULL,
  `icon` varchar(45) DEFAULT NULL,
  `companyname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`companyid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,2,'1','ff70fef4-b472-4dbf-aaf4-7f7a3ff86187.png','Hyundai'),(2,2,'1','43b4dd7d-6ece-4ad4-a2c4-8c36c5e481a7.png','Maruti Suzuki');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `featured`
--

DROP TABLE IF EXISTS `featured`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `featured` (
  `image` text,
  `link` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `featured`
--

LOCK TABLES `featured` WRITE;
/*!40000 ALTER TABLE `featured` DISABLE KEYS */;
INSERT INTO `featured` VALUES ('8712fdcd-a0d9-49e9-a91b-98fe45a807cc.png','1'),('14a5d9fa-9e7a-433d-9fd8-9db811e3633b.png','2'),('3a035a42-dab3-44f6-a0dc-d422c55d291b.png','3'),('cef4cb27-d957-4c4c-9c82-16eacf26a93e.png','4'),('907ed345-2e2e-40f9-8c47-fda5d77dd322.png','5'),('ad8f36a7-9edd-4250-9599-5b620a9c40e8.png','6');
/*!40000 ALTER TABLE `featured` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `model` (
  `modelid` int(11) NOT NULL AUTO_INCREMENT,
  `modelname` varchar(45) DEFAULT NULL,
  `categoryid` varchar(45) DEFAULT NULL,
  `subcategoryid` varchar(45) DEFAULT NULL,
  `companyid` varchar(45) DEFAULT NULL,
  `year` varchar(45) DEFAULT NULL,
  `icon` text,
  PRIMARY KEY (`modelid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES (1,'Grand i10','2','1','1','2012','ca5c5269-81b9-4f80-a262-bb8d2e4e81e3.png'),(2,'Baleno','2','1','2','2016','da10633a-9e35-40e0-8812-9285f1c6d1af.png'),(3,'Alto K10','2','1','2','2016','60592e3c-694e-4398-9cab-463f8dd780d7.png'),(4,'Dezire','2','1','2','2018','f9188d53-a770-4702-a57d-4ef5b9062235.png');
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `offers` (
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES ('30% off','www','95e0cfba-777b-4662-8c1e-60852f230340.jpeg'),('30% off','www','bf844b39-272f-4826-bb8c-e3db0875bf3a.jpeg'),('30% off','www','f6dbd3e6-b2fa-4633-a287-364208f13b25.jpeg'),('30% off','www','bffdcacd-dce7-49cc-b679-9451fd1af63e.jpeg');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subcategory` (
  `subcategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `subcategoryname` varchar(45) DEFAULT NULL,
  `categoryid` int(11) DEFAULT NULL,
  `icon` varchar(45) DEFAULT NULL,
  `priority` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`subcategoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'Small Cars',2,'2876c5a0-062c-41ad-ac4e-fbab054e204e.png','1');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdetails`
--

DROP TABLE IF EXISTS `userdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userdetails` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `mobilenumber` varchar(45) DEFAULT NULL,
  `emailid` varchar(45) DEFAULT NULL,
  `fullname` varchar(45) DEFAULT NULL,
  `aadharnumber` varchar(45) DEFAULT NULL,
  `birthdate` varchar(45) DEFAULT NULL,
  `licenseno` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdetails`
--

LOCK TABLES `userdetails` WRITE;
/*!40000 ALTER TABLE `userdetails` DISABLE KEYS */;
INSERT INTO `userdetails` VALUES (1,'9826488165','xdv','vdx','d','1998-01-01','sd'),(2,'9425337319','nbvchd','mukesh jain','nvkhf','','gvj,g,kg'),(3,'9144213421','jeet18gaur0@gmail.com','jeet gaur','544848945448','2023-08-11','65979rgrge48944');
/*!40000 ALTER TABLE `userdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `vehicle` (
  `vehicleid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` varchar(45) DEFAULT NULL,
  `subcategoryid` varchar(45) DEFAULT NULL,
  `companyid` varchar(45) DEFAULT NULL,
  `modelid` varchar(45) DEFAULT NULL,
  `vendorid` varchar(45) DEFAULT NULL,
  `registrationno` varchar(45) DEFAULT NULL,
  `rentperhour` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `fueltype` varchar(45) DEFAULT NULL,
  `ratings` varchar(45) DEFAULT NULL,
  `average` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  `capacity` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `feature` varchar(45) DEFAULT NULL,
  `icon` text,
  PRIMARY KEY (`vehicleid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,'2','1','1','1','1234','1234586','1300','silver','Petrol','5','12','good','4','Continue','Nice ','7221571c-3195-4197-93f6-6a94781fee60.png'),(2,'2','1','2','2','1234','1234586','1000','silver','Petrol','5','12','good','5','Continue','Nice ','ff61008c-0319-40b1-9ba8-c911e5927d29.png'),(3,'2','1','2','4','1234','1234586','1100','Black','Diesel','5','12','good','5','Continue','Nice ','ba8b55d3-9f84-47b2-a103-c0bf22e3037d.png'),(4,'2','1','2','3','1234','1234586','1200','white','Diesel','5','12','good','4','Continue','Nice ','140c747c-8806-4e2b-b054-5e4d5f7bf76c.png'),(5,'2','1','2','3','1234','1234586','800','white','Diesel','5','12','good','4','Continue','Nice ','2a5e7d9f-2b16-40a3-a9ed-dab75f0badaa.png');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whypnp`
--

DROP TABLE IF EXISTS `whypnp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `whypnp` (
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whypnp`
--

LOCK TABLES `whypnp` WRITE;
/*!40000 ALTER TABLE `whypnp` DISABLE KEYS */;
INSERT INTO `whypnp` VALUES ('zczc','zczc','22852122-beae-41d7-86f6-3e5e721fdbdc.jpeg'),('zczc','zczc','955d44ff-6c95-41e7-8fd6-2ef70468828c.jpeg'),('zczc','zczc','4943849e-f70c-4260-9d4e-4517be7d95ec.jpeg'),('zczc','zczc','b59edf41-ddf1-438b-bb67-0858003fb28d.jpeg');
/*!40000 ALTER TABLE `whypnp` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-04 16:34:57
