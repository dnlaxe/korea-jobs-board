import app from "./app.js";
import { config } from "./config/config.js";
import { pool } from "./db/db.js";
import { appLogger } from "./middleware/logger.js";
import createShutdownHandler from "./shutdown.js";

process.on("uncaughtException", (err) => {
  appLogger.error({ err }, "uncaughtException");
  appLogger.flush();
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  appLogger.error({ reason }, "unhandledRejection");
  appLogger.flush();
  process.exit(1);
});

try {
  await pool.query("SELECT 1");

  appLogger.info("DB ready");

  const server = app.listen(config.port);

  appLogger.info(
    { port: config.port },
    `Server listening on port ${config.port}`,
  );

  const shutdown = createShutdownHandler(server, pool);

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
} catch (err) {
  appLogger.error({ err }, "Startup check failed. Killing process.");
  appLogger.flush();
  process.exit(1);
}
