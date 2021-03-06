-- MySQL Script generated by MySQL Workbench
-- 10/05/14 22:23:58
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema aks-portal
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema aks-portal
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aks-portal` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `aks-portal` ;

-- -----------------------------------------------------
-- Table `aks-portal`.`vendor_contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aks-portal`.`vendor_contact` (
  `vendor_contact_id` INT NOT NULL AUTO_INCREMENT,
  `vendor_id` INT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `phone` VARCHAR(30) NULL,
  `fax` VARCHAR(30) NULL,
  `email` VARCHAR(45) NULL,
  `notes` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`vendor_contact_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aks-portal`.`vendor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aks-portal`.`vendor` (
  `vendor_id` INT NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(45) NULL,
  `mail_address` VARCHAR(100) NULL,
  `bill_address` VARCHAR(100) NULL,
  `phone` VARCHAR(30) NULL,
  `fax` VARCHAR(30) NULL,
  `notes` VARCHAR(255) NULL,
  `updated_at` DATETIME NULL,
  `created_at` DATETIME NULL,
  PRIMARY KEY (`vendor_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aks-portal`.`customer_contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aks-portal`.`customer_contact` (
  `customer_contact_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `phone` VARCHAR(30) NULL,
  `fax` VARCHAR(30) NULL,
  `email` VARCHAR(45) NULL,
  `notes` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`customer_contact_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aks-portal`.`order_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aks-portal`.`order_details` (
  `order_id` INT NULL,
  `product_name` VARCHAR(255) NULL,
  `product_description` DOUBLE NULL,
  `quantity` DOUBLE NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aks-portal`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aks-portal`.`order` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NULL,
  `order_number` INT NULL,
  `order_date` DATETIME NULL,
  `required_date` DATETIME NULL,
  `delivered_date` DATETIME NULL,
  `notes` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`order_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aks-portal`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aks-portal`.`customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(45) NULL,
  `mail_address` VARCHAR(100) NULL,
  `bill_address` VARCHAR(100) NULL,
  `phone` VARCHAR(30) NULL,
  `fax` VARCHAR(30) NULL,
  `notes` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`customer_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aks-portal`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aks-portal`.`employee` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `birth_date` DATETIME NULL,
  `hire_date` DATETIME NULL,
  `address` VARCHAR(255) NULL,
  `phone` VARCHAR(30) NULL,
  `notes` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`employee_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aks-portal`.`po_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aks-portal`.`po_details` (
  `po_id` INT NULL,
  `product_name` VARCHAR(255) NULL,
  `unit_price` DOUBLE NULL,
  `quantity` DOUBLE NULL,
  `discount` DOUBLE NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aks-portal`.`po`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aks-portal`.`po` (
  `po_id` INT NOT NULL AUTO_INCREMENT,
  `vendor_id` INT NULL,
  `customer_id` INT NULL,
  `employee_id` INT NULL,
  `po_date` DATETIME NULL,
  `required_date` DATETIME NULL,
  `notes` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`po_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
