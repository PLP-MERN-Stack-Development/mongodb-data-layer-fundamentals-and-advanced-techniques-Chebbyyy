\# 📚 PLP Bookstore – MongoDB Assignment (Week 1)



\## 🚀 Objective

This project demonstrates MongoDB fundamentals, including:

\- Creating databases and collections  

\- Performing CRUD operations  

\- Advanced queries with filtering, projection, sorting, and pagination  

\- Aggregation pipelines  

\- Indexing for performance optimization  



---



\## 🗄️ Setup



\### Requirements

\- Node.js (latest LTS version recommended)  

\- MongoDB (Local or Atlas cluster)  

\- MongoDB Shell (`mongosh`) or MongoDB Compass  



\### Installation

Clone this repository and install dependencies:



git clone <your-repo-url>

cd my-mongo-app

npm install

MongoDB Setup

Run the setup script to create the database and collection:



node index.js

Populate the database with sample data:





node insert\_books.js

Run the queries:





node queries.js

📂 Project Files

index.js → Creates the plp\_bookstore database and books collection



insert\_books.js → Inserts sample book documents



queries.js → Contains MongoDB queries for CRUD, advanced queries, aggregation, and indexing



screenshot.png → Proof of database and collection in MongoDB Compass/Atlas



🔍 Example Queries

Some examples included in queries.js:



javascript

// Find all books in a specific genre

db.books.find({ genre: "Fiction" });



// Find books published after 2010

db.books.find({ published\_year: { $gt: 2010 } });



// Update price of a book

db.books.updateOne({ title: "1984" }, { $set: { price: 15 } });



// Delete a book by its title

db.books.deleteOne({ title: "The Alchemist" });

📊 Screenshot

Below is a sample screenshot of the MongoDB Compass showing the database and collection:







✅ Submission

Commit all required files:



setup.js



insert\_books.js



queries.js



README.md



screenshot.png



Push to your GitHub Classroom repository:



bash

Copy code

git add .

git commit -m "Completed Week 1 MongoDB assignment"

git push origin main

