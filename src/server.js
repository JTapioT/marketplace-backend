import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import createDefaultTables from "./db/createTables.js";
import productsRouter from "./services/products/routes.js";
import {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers.js";

const server = express();

// Change cors later accordingly if needed.
server.use(cors());
server.use(express.json());

server.use("/products", productsRouter);
// Error-handling middleware
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);


const PORT = process.env.PORT;
console.table(listEndpoints(server));

/* 
Notes:
Here within server.listen, we call function createDefaultTables()
The function will make a query which, in this case, is just about building two tables with columns etc.

Why though function is called here? I guess the order here matters:
1. Start the server and listen to certain port.
2. Make a query to database, initialize database with tables (if not already exist).
3. Now within routes CRUD-operations can be done on database level, when using method pool.query("SQL QUERY WITH PARAMETERS", [order is important for provided values]). Are the $1, $2 etc called parameters or what?

Note for myself: IMPORTANT IS THAT YOU REMEMBER TO IMPORT THE 'pool' created within connect.js to handler files in order to use the pool with method query() etc.

*/


server.listen(PORT, async () => {
  console.log("Server is running on port:", PORT);
  await createDefaultTables();
})

server.on("error", console.log);