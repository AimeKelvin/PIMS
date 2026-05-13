# SQL Cheat Sheet

## Create Database

CREATE DATABASE school_db;
USE school_db;

## Create Table

CREATE TABLE Students(
  StudentID INT AUTO_INCREMENT PRIMARY KEY,
  StudentName VARCHAR(100) NOT NULL,
  Age INT
);

## Insert

INSERT INTO Students (StudentName, Age)
VALUES ('Aime', 20);

## Select All

SELECT * FROM Students;

## Select Specific Columns

SELECT StudentName, Age FROM Students;

## Filter with WHERE

SELECT * FROM Students
WHERE Age > 18;

## Search with LIKE

SELECT * FROM Students
WHERE StudentName LIKE '%ai%';

## Sort

SELECT * FROM Students
ORDER BY StudentName ASC;

SELECT * FROM Students
ORDER BY Age DESC;

## Limit

SELECT * FROM Students
LIMIT 5;

## Update

UPDATE Students
SET Age = 21
WHERE StudentID = 1;

## Delete

DELETE FROM Students
WHERE StudentID = 1;

## Count

SELECT COUNT(*) AS TotalStudents
FROM Students;

## Sum

SELECT SUM(Amount) AS TotalAmount
FROM Payments;

## Average

SELECT AVG(Marks) AS AverageMarks
FROM Results;

## Group By

SELECT ClassID, COUNT(*) AS TotalStudents
FROM Students
GROUP BY ClassID;

## Having

SELECT ClassID, COUNT(*) AS TotalStudents
FROM Students
GROUP BY ClassID
HAVING COUNT(*) > 5;

## Inner Join

SELECT Students.StudentName, Classes.ClassName
FROM Students
INNER JOIN Classes
ON Students.ClassID = Classes.ClassID;

## Left Join

SELECT Students.StudentName, Payments.Amount
FROM Students
LEFT JOIN Payments
ON Students.StudentID = Payments.StudentID;

## Multiple Joins

SELECT Students.StudentName, Classes.ClassName, Payments.Amount
FROM Students
JOIN Classes ON Students.ClassID = Classes.ClassID
JOIN Payments ON Students.StudentID = Payments.StudentID;

## Subquery

SELECT * FROM Students
WHERE ClassID IN (
  SELECT ClassID FROM Classes WHERE ClassName = 'S6'
);

## Between

SELECT * FROM Payments
WHERE Amount BETWEEN 1000 AND 5000;

## Dates

SELECT * FROM Orders
WHERE DATE(CreatedAt) = CURDATE();

## Beginner Exam CRUD Pattern

GET all:
SELECT * FROM TableName;

GET one:
SELECT * FROM TableName WHERE ID = ?;

CREATE:
INSERT INTO TableName (Column1, Column2) VALUES (?, ?);

UPDATE:
UPDATE TableName SET Column1 = ?, Column2 = ? WHERE ID = ?;

DELETE:
DELETE FROM TableName WHERE ID = ?;
