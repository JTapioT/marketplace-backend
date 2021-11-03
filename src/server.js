import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { connectDB } from "./db/index.js";
import productsRouter from "./services/products/routes.js";
import reviewsRouter from "./services/reviews/routes.js";
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
server.use("/reviews", reviewsRouter);
// Error-handling middleware
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);


const PORT = process.env.PORT;
console.table(listEndpoints(server));


server.listen(PORT, async () => {
  console.log("Server is running on port:", PORT);
  await connectDB();
})

server.on("error", console.log);