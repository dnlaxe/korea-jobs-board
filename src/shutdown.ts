import { Server } from "node:http";
import { appLogger } from "./middleware/logger.js";
import {
  isShuttingDown,
  markShuttingDown,
} from "./features/health/health.state.js";

const SHUTDOWN_TIMEOUT_MS = 3_000;

export default function createShutdownHandler(server: Server) {
  return function (signal: string) {
    if (isShuttingDown()) return;
    markShuttingDown();

    appLogger.info({ signal }, "Shutdown initiated");

    server.getConnections((err, count) => {
      if (err) {
        appLogger.error({ err }, "Error checking connection count");
      } else {
        appLogger.info(
          { activeConnections: count },
          "Active connections at start of shutdown",
        );
      }
    });

    const forceExit = setTimeout(() => {
      appLogger.error("Shutdown timed out, forcing exit");
      appLogger.flush();
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);

    forceExit.unref();

    server.closeIdleConnections();

    server.close((err) => {
      if (err) {
        appLogger.error({ err }, "Error during HTTP server shutdown");
        appLogger.flush();
        process.exit(1);
      }

      appLogger.info("HTTP server closed");
      clearTimeout(forceExit);
      appLogger.info("Graceful shutdown complete");
      appLogger.flush();
      process.exit(0);
    });
  };
}
