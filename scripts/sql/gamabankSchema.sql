CREATE DATABASE `gamabank` 

USE `gamabank`;

/*Table structure for table `accountoperation` */

DROP TABLE IF EXISTS `accountoperation`;

CREATE TABLE `accountoperation` (
  `accountOperationCod` int(11) NOT NULL,
  `accountOperationName` varchar(120) NOT NULL,
  `accountOperationStatus` varchar(7) NOT NULL,
  PRIMARY KEY (`accountOperationCod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `bank` */

DROP TABLE IF EXISTS `bank`;

CREATE TABLE `bank` (
  `bankCode` int(11) NOT NULL,
  `bankName` varchar(120) NOT NULL,
  `bankStatus` varchar(7) NOT NULL,
  PRIMARY KEY (`bankCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `cardentrie` */

DROP TABLE IF EXISTS `cardentrie`;

CREATE TABLE `cardentrie` (
  `cardEntrieCod` int(11) NOT NULL,
  `clientCardNumber` int(11) NOT NULL,
  `clientCod` int(11) NOT NULL,
  `checkingAccountNumber` int(11) NOT NULL,
  `cardEntrieType` varchar(1) NOT NULL,
  `cardEntrieDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cardEntrieValue` decimal(15,2) NOT NULL,
  `cardEntrieCreditInstallment` int(11) NOT NULL,
  PRIMARY KEY (`cardEntrieCod`,`clientCardNumber`),
  KEY `clientCod` (`clientCod`),
  KEY `checkingAccountNumber` (`checkingAccountNumber`),
  KEY `clientCardNumber` (`clientCardNumber`),
  CONSTRAINT `cardentrie_ibfk_1` FOREIGN KEY (`clientCod`) REFERENCES `client` (`clientCod`),
  CONSTRAINT `cardentrie_ibfk_2` FOREIGN KEY (`checkingAccountNumber`) REFERENCES `checkingaccount` (`checkingAccountNumber`),
  CONSTRAINT `cardentrie_ibfk_3` FOREIGN KEY (`clientCardNumber`) REFERENCES `clientcard` (`clientCardNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `checkingaccount` */

DROP TABLE IF EXISTS `checkingaccount`;

CREATE TABLE `checkingaccount` (
  `checkingAccountNumber` int(11) NOT NULL,
  `clientCod` int(11) NOT NULL,
  `checkingAccountBalance` decimal(10,0) NOT NULL,
  `checkingAccountCreatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `checkingAccountStatus` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`checkingAccountNumber`),
  KEY `clientCod` (`clientCod`),
  CONSTRAINT `clientCod` FOREIGN KEY (`clientCod`) REFERENCES `client` (`clientCod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `checkingaccountcheckout` */

DROP TABLE IF EXISTS `checkingaccountcheckout`;

CREATE TABLE `checkingaccountcheckout` (
  `checkingAccountCheckoutNumber` int(11) NOT NULL AUTO_INCREMENT,
  `checkingAccountNumber` int(11) NOT NULL,
  `accountOperationCod` int(11) NOT NULL,
  `checkingAccountCheckoutDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `checkingAccountCheckoutValue` decimal(15,2) NOT NULL,
  `bankCode` int(11) DEFAULT NULL,
  `checkingAccountCheckoutCPF` int(11) DEFAULT NULL,
  `checkingAccountCheckoutAccountDestiny` int(11) DEFAULT NULL,
  PRIMARY KEY (`checkingAccountCheckoutNumber`,`checkingAccountNumber`),
  KEY `checkingAccountNumber` (`checkingAccountNumber`),
  KEY `accountOperationCod` (`accountOperationCod`),
  KEY `bankCode` (`bankCode`),
  CONSTRAINT `checkingaccountcheckout_ibfk_1` FOREIGN KEY (`checkingAccountNumber`) REFERENCES `checkingaccount` (`checkingAccountNumber`),
  CONSTRAINT `checkingaccountcheckout_ibfk_2` FOREIGN KEY (`accountOperationCod`) REFERENCES `accountoperation` (`accountOperationCod`),
  CONSTRAINT `checkingaccountcheckout_ibfk_3` FOREIGN KEY (`bankCode`) REFERENCES `bank` (`bankCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `checkingaccountentry` */

DROP TABLE IF EXISTS `checkingaccountentry`;

CREATE TABLE `checkingaccountentry` (
  `checkingAccountEntryNumber` int(11) NOT NULL,
  `checkingAccountNumber` int(11) NOT NULL,
  `accountOperationCod` int(11) NOT NULL,
  `checkingAccountEntryDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `checkingAccountEntryValue` decimal(15,2) NOT NULL,
  `bankCode` int(11) DEFAULT NULL,
  `checkingAccountEntryCPF` int(11) DEFAULT NULL,
  `checkingAccountEntryAccountOrigin` int(11) DEFAULT NULL,
  PRIMARY KEY (`checkingAccountEntryNumber`,`checkingAccountNumber`),
  KEY `checkingAccountNumber` (`checkingAccountNumber`),
  KEY `accountOperationCod` (`accountOperationCod`),
  KEY `bankCode` (`bankCode`),
  CONSTRAINT `checkingaccountentry_ibfk_1` FOREIGN KEY (`checkingAccountNumber`) REFERENCES `checkingaccount` (`checkingAccountNumber`),
  CONSTRAINT `checkingaccountentry_ibfk_2` FOREIGN KEY (`accountOperationCod`) REFERENCES `accountoperation` (`accountOperationCod`),
  CONSTRAINT `checkingaccountentry_ibfk_3` FOREIGN KEY (`bankCode`) REFERENCES `bank` (`bankCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `city` */

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `cityCod` int(11) NOT NULL,
  `cityName` varchar(120) NOT NULL,
  `stateCod` int(11) NOT NULL,
  `cityStatus` varchar(7) NOT NULL,
  PRIMARY KEY (`cityCod`),
  KEY `stateCod` (`stateCod`),
  CONSTRAINT `stateCod` FOREIGN KEY (`stateCod`) REFERENCES `state` (`stateCod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `client` */

DROP TABLE IF EXISTS `client`;

CREATE TABLE `client` (
  `clientCod` int(11) NOT NULL AUTO_INCREMENT,
  `clientName` varchar(120) NOT NULL,
  `clientCPF` int(11) NOT NULL,
  `clientStatus` varchar(7) NOT NULL,
  `clientCreatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientCod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `clientcard` */

DROP TABLE IF EXISTS `clientcard`;

CREATE TABLE `clientcard` (
  `clientCardNumber` int(11) NOT NULL,
  `clientCod` int(11) NOT NULL,
  `checkingAccountNumber` int(11) NOT NULL,
  `cardType` varchar(2) NOT NULL,
  `clientCreditCardLimit` decimal(15,2) NOT NULL,
  `clientCardCreatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`clientCardNumber`,`clientCod`,`checkingAccountNumber`),
  KEY `clientCod` (`clientCod`),
  KEY `checkingAccountNumber` (`checkingAccountNumber`),
  CONSTRAINT `clientcard_ibfk_1` FOREIGN KEY (`clientCod`) REFERENCES `client` (`clientCod`),
  CONSTRAINT `clientcard_ibfk_2` FOREIGN KEY (`checkingAccountNumber`) REFERENCES `checkingaccount` (`checkingAccountNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `creditcardentrieinstallment` */

DROP TABLE IF EXISTS `creditcardentrieinstallment`;

CREATE TABLE `creditcardentrieinstallment` (
  `creditCardEntrieCod` int(11) NOT NULL,
  `creditCardEntrieInstallmentNumber` int(11) NOT NULL,
  `creditCardEntrieInstallmentValue` decimal(10,0) NOT NULL,
  `creditCardEntrieInstallmentDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`creditCardEntrieCod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `state` */

DROP TABLE IF EXISTS `state`;

CREATE TABLE `state` (
  `stateCod` int(11) NOT NULL,
  `stateName` varchar(120) NOT NULL,
  `stateStatus` varchar(7) NOT NULL,
  PRIMARY KEY (`stateCod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userName` varchar(120) NOT NULL,
  `clientCod` int(11) NOT NULL,
  `userPassword` varchar(120) NOT NULL,
  `userSalt` varchar(120) NOT NULL,
  PRIMARY KEY (`userName`),
  KEY `clientCod` (`clientCod`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`clientCod`) REFERENCES `client` (`clientCod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;