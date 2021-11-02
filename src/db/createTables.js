import fs from "fs-extra";
import path from "path";
import pool from "./connect.js";

// These lines of code mainly just pure-copy paste from teacher's example and edited to make this work within my project.

console.log(process.cwd());
const tablesFilePath = path.join(process.cwd(), "./src/db/tables.sql");
console.log(tablesFilePath);

async function createDefaultTables() {
  try {
    // Read the tables.sql file as buffer
    const buffer = await fs.readFile(tablesFilePath);
    // Convert buffer to string
    const tablesSQLQuery = buffer.toString();
    // execute query
    await pool.query(tablesSQLQuery);
    console.log(`Default tables are created.`);
  } catch (error) {
    console.log(error);
  }
}

export default createDefaultTables;