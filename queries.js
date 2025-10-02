// queries.js
// Assignment: Week 1 – MongoDB Data Layer Fundamentals & Advanced Techniques

const { MongoClient } = require("mongodb");

// Replace with your connection string if using Atlas
const uri = "mongodb+srv://cheburetdaisy65_db_user:12345@cluster0.pns2wuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbName = "plp_bookstore";
const collectionName = "books";

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(dbName);
    const books = db.collection(collectionName);

    // -----------------------------
    // Task 2: Basic CRUD Queries
    // -----------------------------

    // 1. Find all books in a specific genre (e.g., Fiction)
    const fictionBooks = await books.find({ genre: "Fiction" }).toArray();
    console.log("Fiction Books:", fictionBooks);

    // 2. Find books published after a certain year (e.g., 2010)
    const recentBooks = await books.find({ published_year: { $gt: 2010 } }).toArray();
    console.log("Books after 2010:", recentBooks);

    // 3. Find books by a specific author (e.g., George Orwell)
    const orwellBooks = await books.find({ author: "George Orwell" }).toArray();
    console.log("George Orwell Books:", orwellBooks);

    // 4. Update the price of a specific book (e.g., "1984")
    await books.updateOne({ title: "1984" }, { $set: { price: 15.99 } });
    console.log("Updated price for '1984'");

    // 5. Delete a book by its title (e.g., "The Alchemist")
    await books.deleteOne({ title: "The Alchemist" });
    console.log("Deleted 'The Alchemist'");

    // -----------------------------
    // Task 3: Advanced Queries
    // -----------------------------

    // 6. Find books that are in stock AND published after 2010
    const inStockRecent = await books.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log("In-stock & after 2010:", inStockRecent);

    // 7. Use projection to return only title, author, and price
    const projection = await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
    console.log("Projection (title, author, price):", projection);

    // 8. Sort books by price ascending
    const sortAsc = await books.find().sort({ price: 1 }).toArray();
    console.log("Books sorted by price (asc):", sortAsc);

    // 9. Sort books by price descending
    const sortDesc = await books.find().sort({ price: -1 }).toArray();
    console.log("Books sorted by price (desc):", sortDesc);

    // 10. Pagination – 5 books per page (e.g., page 1)
    const page = 1;
    const pageSize = 5;
    const paginatedBooks = await books.find().skip((page - 1) * pageSize).limit(pageSize).toArray();
    console.log(`Page ${page} Books:`, paginatedBooks);

    // -----------------------------
    // Task 4: Aggregation Pipeline
    // -----------------------------

    // 11. Average price of books by genre
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("Average Price by Genre:", avgPriceByGenre);

    // 12. Author with the most books
    const mostBooksAuthor = await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("Author with most books:", mostBooksAuthor);

    // 13. Group books by publication decade and count them
    const booksByDecade = await books.aggregate([
      {
        $group: {
          _id: { $subtract: [{ $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] }] },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("Books grouped by decade:", booksByDecade);

    // -----------------------------
    // Task 5: Indexing
    // -----------------------------

    // 14. Create index on title
    await books.createIndex({ title: 1 });
    console.log("Index created on 'title'");

    // 15. Create compound index on author + published_year
    await books.createIndex({ author: 1, published_year: 1 });
    console.log("Compound index created (author + published_year)");

    // 16. Use explain() to show query performance with index
    const explainResult = await books.find({ title: "1984" }).explain("executionStats");
    console.log("Explain output for title search:", explainResult.executionStats);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

runQueries();
