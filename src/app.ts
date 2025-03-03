import express from "express";
import "express-async-errors";
import authRoutes from "./routes/auth.routes.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";

const app = express();

app.use(express.json());
console.log("Antes das rotas");
app.use("/auth", authRoutes);
console.log("Depois das rotas");
app.use(errorHandler)

export default app;
