import prisma from "./src/config/database.ts";
import express from "express";
import dotenv from "dotenv";
import app from "./src/app.ts";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Algo deu errado!");
  }
);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Rota de teste para verificar a conexão com o banco
// app.get("/test-db", async (req, res) => {
//   try {
//     await prisma.$connect();
//     res.send("Conexão com o banco de dados bem-sucedida!");
//   } catch (error: any) {
//     res
//       .status(500)
//       .send("Erro ao conectar ao banco de dados: " + error.message);
//   }
// });
