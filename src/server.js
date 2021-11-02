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


server.listen(PORT, async () => {
  console.log("Server is running on port:", PORT);
  await createDefaultTables();
})

server.on("error", console.log);