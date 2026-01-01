# Normalization in Database


## Table of Contents

- [Normalization in Databases](#normalization-in-databases)
  - [Redundancy](#redundancy)
  - [Non-Full Proof Data](#non-full-proof-data)
- [Types of Relationships](#types-of-relationships)
  - [One-to-One Relationship](#1-one-to-one-relationship)
  - [One-to-Many Relationship](#2-one-to-many-relationship)
  - [Many-to-One Relationship](#3-many-to-one-relationship)
  - [Many-to-Many Relationship](#4-many-to-many-relationship)
  - [Final Graph](#5-final-graph)
- [Normalizing Data](#normalizing-data)
  - [Normal Forms](#normal-forms)
  - [First Normal Form (1NF)](#first-normal-form-1nf)
  - [Second Normal Form (2NF)](#second-normal-form-2nf)
  - [Third Normal Form (3NF)](#third-normal-form-3nf)

---

## Normalization in Databases

Normalization is a systematic approach to organizing data in a database to reduce redundancy and improve data integrity. It involves breaking down a database into multiple tables and defining relationships between them based on a set of rules or normal forms. By following these normal forms, we can eliminate redundant data and ensure that data is stored in a logical and efficient manner.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F2d42879a-8b77-4076-82cb-b08f86dff678%2FUntitled.png?table=block&id=8ebb6210-d8e1-407e-b870-610044a180aa&cache=v2)

### Redundancy

Redundant data refers to the duplication of data across multiple tables or records within a database. This can lead to several issues, such as:

1. **Data Inconsistency**: If the same data is stored in multiple places, updating it in one location but not the others can lead to inconsistent data.

2. **Wasted Storage Space**: Redundant data takes up unnecessary storage space, which can become problematic as the database grows.

3. **Update Anomalies**: When redundant data needs to be updated, multiple updates are required, increasing the risk of errors and inconsistencies.

4. **Insertion Anomalies**: In some cases, it may not be possible to insert new data due to the lack of certain information required by the database structure.

5. **Deletion Anomalies**: Deleting data from one table may inadvertently delete related data from another table, leading to data loss.

To illustrate the concept of redundancy, let's consider the example provided:

```
users
+--------+----------+
| user_id| username |
+--------+----------+
|      1 | john     |
|      2 | jane     |
+--------+----------+

user_metadata
+--------+----------+------------+
| user_id| name     | email      |
+--------+----------+------------+
|      1 | John Doe | john@email.com |
|      2 | Jane Smith| jane@email.com|
+--------+----------+------------+

orders
+----------+----------+------------+
| order_id | user_id  | name       |
+----------+----------+------------+
|        1 |        1 | John Doe   |
|        2 |        2 | Jane Smith |
+----------+----------+------------+
```

In this example, the `name` column in the `orders` table is redundant because it duplicates the information already present in the `user_metadata` table. This redundancy can lead to data inconsistencies if the name is updated in one table but not the other.

### Non-Full Proof Data

The term "non-full proof data" refers to a database design that lacks proper relationships between tables, making it impossible to retrieve or associate data correctly. The example provided illustrates this issue:

```
users
+--------+----------+
| user_id| name     |
+--------+----------+
|      1 | John Doe |
|      2 | Jane Doe |
+--------+----------+

orders
+----------+----------+
| order_id | name     |
+----------+----------+
|        1 | John Doe |
|        2 | Jane Doe |
+----------+----------+
```

In this schema, there is no relationship between the `users` and `orders` tables. The `name` column in the `orders` table does not provide a reliable way to associate an order with a specific user. If two users have the same name (e.g., "John Doe"), it becomes impossible to determine which user placed a particular order.

Normalization is applied to databases that are "full proof" (i.e., have proper relationships between tables) to remove redundancy and improve data integrity.

---

## Types of Relationships

In the context of a library management system, various types of relationships can exist between different entities or tables. Let's explore these relationships and their use cases.

### 1] One-to-One Relationship

A one-to-one relationship is when a record in one table is associated with at most one record in another table, and vice versa. In the library management system, a one-to-one relationship can exist between the `Users` table and the `Library Card` table.

**Example:** Each user in the library system can have a single library card, and each library card is associated with only one user.

```
Users
+--------+----------+
| user_id| username |
+--------+----------+
|      1 | john     |
|      2 | jane     |
+--------+----------+

Library Card
+----------+----------+
| card_id  | user_id  |
+----------+----------+
|        1 |        1 |
|        2 |        2 |
+----------+----------+
```

In this example, the `user_id` column in the `Library Card` table is a foreign key referencing the `user_id` column in the `Users` table, establishing a one-to-one relationship.

### 2] One-to-Many Relationship

A one-to-many relationship is when a record in one table can be associated with multiple records in another table, but each record in the other table is associated with only one record in the first table.

**Example:** In the library system, a one-to-many relationship can exist between the `Users` table and the `Books` table, where each user can borrow multiple books, but each book can be borrowed by only one user at a time.

```
Users
+--------+----------+
| user_id| username |
+--------+----------+
|      1 | john     |
|      2 | jane     |
+--------+----------+

Books
+----------+----------+------------+
| book_id  | user_id  | book_title |
+----------+----------+------------+
|        1 |        1 | Book A     |
|        2 |        1 | Book B     |
|        3 |        2 | Book C     |
+----------+----------+------------+
```

In this example, the `user_id` column in the `Books` table is a foreign key referencing the `user_id` column in the `Users` table, establishing a one-to-many relationship.

### 3] Many-to-One Relationship

A many-to-one relationship is the inverse of a one-to-many relationship. It occurs when multiple records in one table are associated with a single record in another table.

**Example:** In the library system, a many-to-one relationship can exist between the `Books` table and the `Genre` table, where multiple books can belong to a single genre, but each book can have only one genre.

```
Books
+----------+------------+
| book_id  | book_title |
+----------+------------+
|        1 | Book A     |
|        2 | Book B     |
|        3 | Book C     |
+----------+------------+

Genre
+----------+-------------+
| genre_id | genre_name  |
+----------+-------------+
|        1 | Fiction     |
|        2 | Non-Fiction |
+----------+-------------+

Book_Genre
+----------+----------+
| book_id  | genre_id |
+----------+----------+
|        1 |        1 |
|        2 |        1 |
|        3 |        2 |
+----------+----------+
```

In this example, the `Book_Genre` table is a junction table that establishes the many-to-one relationship between the `Books` and `Genre` tables.

### 4] Many-to-Many Relationship

A many-to-many relationship is when multiple records in one table can be associated with multiple records in another table, and vice versa.

**Example:** In the library system, a many-to-many relationship can exist between the `Books` table and the `Authors` table, where a book can have multiple authors, and an author can write multiple books.

```
Books
+----------+------------+
| book_id  | book_title |
+----------+------------+
|        1 | Book A     |
|        2 | Book B     |
|        3 | Book C     |
+----------+------------+

Authors
+----------+---------------+
| author_id| author_name  |
+----------+---------------+
|        1 | Author X     |
|        2 | Author Y     |
|        3 | Author Z     |
+----------+---------------+

Book_Author
+----------+----------+
| book_id  | author_id|
+----------+----------+
|        1 |        1 |
|        1 |        2 |
|        2 |        2 |
|        3 |        3 |
+----------+----------+
```

In this example, the `Book_Author` table is a junction table that establishes the many-to-many relationship between the `Books` and `Authors` tables.

### 5] Final Graph

Based on the relationships discussed above, the final graph representing the library management system could look like this:

```
+----------+    +----------+
|  Users   |1   1|Library  |
|          |    |  Card    |
+----------+    +----------+
     |
     |1
     |\
     | \
     |  \
     |   \
     |    \
     |     \
     N      1
     |       |
+----------+  +----------+
|  Books   |1 N|  Genre   |
+----------+  +----------+
     N      N
     |      |
+----------+
| Authors  |
+----------+
```

This graph illustrates the one-to-one relationship between `Users` and `Library Card`, the one-to-many relationship between `Users` and `Books`, the many-to-one relationship between `Books` and `Genre`, and the many-to-many relationship between `Books` and `Authors`.

---

## Normalizing Data

Normalization in databases is a systematic approach to organizing data in a logical and efficient manner. It involves decomposing tables to eliminate data redundancy and improve data integrity. The normalization process typically progresses through several normal forms, each building upon the previous one. The goal is to achieve a database design that minimizes data anomalies and ensures data consistency.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F2fcf3948-5380-4427-a1b9-7efc2e6bf561%2FUntitled.png?table=block&id=9ea217b1-28c2-4bcb-98f0-063a1fbcf128&cache=v2)

### Normal Forms

When analyzing a database schema, you can identify its level of normalization based on the following normal forms:

1. **First Normal Form (1NF)**
2. **Second Normal Form (2NF)**
3. **Third Normal Form (3NF)**
4. **Boyce-Codd Normal Form (BCNF)**
5. **Fourth Normal Form (4NF)**
6. **Fifth Normal Form (5NF)**

In practice, most database designs aim to reach the Third Normal Form (3NF) or the Boyce-Codd Normal Form (BCNF). Going beyond these forms can lead to excessive joins and potentially impact performance.

### First Normal Form (1NF)

A table is in the First Normal Form (1NF) if it meets the following criteria:

1. **Atomicity**: A single cell must not hold more than one value. This rule ensures that each column of a database table holds only atomic (indivisible) values, and multi-valued attributes are split into separate columns.

**Example:** If a column is meant to store phone numbers, and a person has multiple phone numbers, each number should be in a separate row, not as a list or set in a single cell.

```
# Not in 1NF
+--------+---------------+
| user_id| phone_numbers |
+--------+---------------+
|      1 | 123-456-7890, 987-654-3210 |
|      2 | 555-123-4567 |
+--------+---------------+

# In 1NF
+--------+---------------+
| user_id| phone_number  |
+--------+---------------+
|      1 | 123-456-7890  |
|      1 | 987-654-3210  |
|      2 | 555-123-4567  |
+--------+---------------+
```

2. **Primary Key**: Each table should have a primary key, which is a column (or a set of columns) that uniquely identifies each row in a table.

3. **No Duplicated Rows**: To ensure data integrity, each row in the table should be unique. This rule works hand-in-hand with the presence of a primary key to prevent duplicate entries, which can lead to data anomalies.

4. **Single Value per Column**: Each column must have only one value for each row in the table. This rule emphasizes that every column must hold only one value per row, and that value should be of the same kind for that column across all rows.

```
# Not in 1NF
+--------+---------------+
| user_id| phone_numbers |
+--------+---------------+
|      1 | 123-456-7890, 987-654-3210 |
|      2 | 555-123-4567 |
+--------+---------------+

# In 1NF
+--------+---------------+
| user_id| phone_number  |
+--------+---------------+
|      1 | 123-456-7890  |
|      1 | 987-654-3210  |
|      2 | 555-123-4567  |
+--------+---------------+
```

### Second Normal Form (2NF)

A table is in the Second Normal Form (2NF) if it meets the following criteria:

1. It is already in the First Normal Form (1NF).
2. It has no partial dependency.

**Partial Dependency**: This occurs when a non-primary key attribute is dependent on part of a composite primary key, rather than on the whole primary key. In simpler terms, if your table has a primary key made up of multiple columns, a partial dependency exists if an attribute in the table is dependent only on a subset of those columns that form the primary key.

**Example:** Consider a table with the composite primary key `(StudentID, CourseID)` and other attributes like `InstructorName` and `CourseName`. If `CourseName` is dependent only on `CourseID` and not on the complete composite key `(StudentID, CourseID)`, then `CourseName` has a partial dependency on the primary key. This violates the Second Normal Form (2NF).

**Before Normalization:**

```
Enrollments
+------------+------------+---------------+---------------+
| student_id | course_id  | course_name   | instructor_name|
+------------+------------+---------------+---------------+
|          1 |          1 | Introduction to Programming | John Doe |
|          1 |          2 | Data Structures | Jane Smith|
|          2 |          1 | Introduction to Programming | John Doe |
+------------+------------+---------------+---------------+
```

In the above table, the primary key is `(student_id, course_id)`. However, `CourseName` and `InstructorName` have a partial dependency on `CourseID` because they are determined solely by the course, not by the combination of `student_id` and `course_id`.

**After Normalization (2NF):** To normalize the table to 2NF, we need to separate the attributes that have a partial dependency into a new table.

```
Courses
+------------+---------------+---------------+
| course_id  | course_name   | instructor_name|
+------------+---------------+---------------+
|          1 | Introduction to Programming | John Doe |
|          2 | Data Structures | Jane Smith|
+------------+---------------+---------------+

Enrollments
+------------+------------+
| student_id | course_id  |
+------------+------------+
|          1 |          1 |
|          1 |          2 |
|          2 |          1 |
+------------+------------+
```

In the normalized schema, the `Courses` table contains the `course_id`, `course_name`, and `instructor_name`, eliminating the partial dependency. The `Enrollments` table now only contains the `student_id` and `course_id`, which form the primary key.

### Third Normal Form (3NF)

When a table is in the Second Normal Form (2NF), it eliminates repeating groups and redundancy, but it does not eliminate transitive partial dependency.

For a table to be in the Third Normal Form (3NF), it must:

1. Be in the Second Normal Form (2NF).
2. Have no transitive partial dependency.

**Transitive Dependency**: A transitive dependency in a relational database occurs when one non-key attribute indirectly depends on the primary key through another non-key attribute.

**Example:** Consider a table with the following schema:

```
Employees
+-------------+---------------+---------------+
| employee_id | employee_name | department_name |
+-------------+---------------+---------------+
|           1 | John Doe      | Sales         |
|           2 | Jane Smith    | Marketing     |
|           3 | Bob Johnson   | Sales         |
+-------------+---------------+---------------+
```

In this table, `department_name` has a transitive dependency on the primary key `employee_id`. The relationship is as follows:

- `employee_id` determines `employee_name`
- `employee_name` determines `department_name`

Therefore, `department_name` indirectly depends on `employee_id` through `employee_name`.

**To normalize to 3NF:** To eliminate the transitive dependency, we need to separate the `department_name` attribute into a new table.

```
Employees
+-------------+---------------+---------------+
| employee_id | employee_name | department_id |
+-------------+---------------+---------------+
|           1 | John Doe      |             1 |
|           2 | Jane Smith    |             2 |
|           3 | Bob Johnson   |             1 |
+-------------+---------------+---------------+

Departments
+---------------+---------------+
| department_id | department_name |
+---------------+---------------+
|             1 | Sales         |
|             2 | Marketing     |
+---------------+---------------+
```

In the normalized schema, the `Employees` table now has a `department_id` column that directly depends on the primary key `employee_id`. The `Departments` table contains the `department_id` and `department_name`, eliminating the transitive dependency.

By following the normalization process and adhering to the Third Normal Form (3NF), you can ensure that your database design minimizes data redundancy, maintains data integrity, and reduces the risk of data anomalies.

---

> **Important Note:** It's important to note that while normalization is a crucial step in database design, over-normalization can lead to excessive joins and potentially impact performance. In practice, most database designs aim to reach the Third Normal Form (3NF) or the Boyce-Codd Normal Form (BCNF), as going beyond these forms may not provide significant benefits and can introduce unnecessary complexity.