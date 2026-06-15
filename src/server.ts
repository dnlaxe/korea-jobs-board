import app from "./app.js";
import { config } from "./config/config.js";
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

const server = app.listen(config.port);

appLogger.info(
  { port: config.port },
  `Server listening on port ${config.port}`,
);

const shutdown = createShutdownHandler(server);

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
