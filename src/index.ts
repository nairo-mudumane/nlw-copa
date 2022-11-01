import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});

async function start() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    const pools = await prisma.pool.findMany({
      orderBy: { createdAt: "asc" },
    });

    return { message: "ok", total: pools.length, data: pools };
  });

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

start();
