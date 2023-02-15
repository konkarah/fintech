CREATE TABLE students(
	reg_no varchar(25),
	student_name varchar(30),
	phone_no varchar(15),
    class varchar(10),
	PRIMARY KEY(reg_no)
);

CREATE TABLE class(
	class_name varchar(10),
	stu_no int,
	PRIMARY KEY(class_name)
);

CREATE DATABASE IF NOT EXISTS kilimo;