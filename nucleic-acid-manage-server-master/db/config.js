const mysql = require("mysql");
const fs = require("fs");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "031106",
  database: "dbase",
});

// Function to run the SQL scripts
const runScripts = () => {
  // Read create.sql file
  const createSql = fs.readFileSync("create.sql", "utf8");
  
  // Execute create.sql script
  db.query(createSql, (err) => {
    if (err) {
      console.error("Error executing create.sql:", err);
      return;
    }
    
    console.log("create.sql executed successfully.");
    
    // Read insert.sql file
    const insertSql = fs.readFileSync("insert.sql", "utf8");
    
    // Execute insert.sql script
    db.query(insertSql, (err) => {
      if (err) {
        console.error("Error executing insert.sql:", err);
        return;
      }
      
      console.log("insert.sql executed successfully.");
    });
  });
};

// Run the scripts when the application starts
// runScripts();

module.exports = db;