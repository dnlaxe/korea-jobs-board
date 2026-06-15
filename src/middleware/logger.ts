import pino from "pino";
import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { isDevelopment } from "../config/config.js";

export const appLogger = pino({
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          ignore: "reqId,responseTime",
          hideObject: true,
        },
      }
    : undefined,
});

export const logger = pinoHttp({
  logger: appLogger,

  // ID
  genReqId: (req) => {
    return req.headers["x-request-id"] || randomUUID();
  },

  // Give ID to logger
  customProps: (req) => ({
    reqId: req.id,
  }),

  customSuccessMessage: (
    req: IncomingMessage,
    res: ServerResponse,
    responseTime: number,
  ) => {
    return `${req.method} | ${req.url} | ${res.statusCode} | ${responseTime}ms`;
  },

  customErrorMessage: (
    req: IncomingMessage,
    res: ServerResponse,
    err: Error,
  ) => {
    return `${req.method} | ${req.url} | ${res.statusCode} | ERROR: ${err.message}`;
  },

  // hide json dumps
  serializers: {
    req: () => undefined,
    res: () => undefined,
  },
});
