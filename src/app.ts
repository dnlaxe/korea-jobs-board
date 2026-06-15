import express from "express";
import { isBasicAuthEnabled, isProduction } from "./config/config.js";
import { logger } from "./middleware/logger.js";
// import helmet from "helmet";
import compression from "compression";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import jobsRouter from "./features/jobs/jobs.routes.js";
import adminRouter from "./features/admin/admin.routes.js";
import manageRouter from "./features/manage/manage.routes.js";
import paymentRouter from "./features/payment/payment.routes.js";
import healthRouter from "./features/health/health.routes.js";
import cookieParser from "cookie-parser";
// import rateLimiterMiddleware from "./middleware/rateLimiter.js";
import { requireBasicAuth } from "./middleware/basicAuth.js";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(express.static("public"));

// app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(logger);
app.use(compression());
app.disable("x-powered-by");
// app.use(rateLimiterMiddleware);

if (isBasicAuthEnabled) {
  app.use(requireBasicAuth);
} else {
  app.use("/admin", requireBasicAuth);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(healthRouter);
app.use(jobsRouter);
app.use(paymentRouter);

app.use(adminRouter);
app.use(manageRouter);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../views/layouts"),
    partialsDir: path.join(__dirname, "../views/partials"),
    helpers: {
      eq: (a: unknown, b: unknown) => a === b,
      toString: (x: number) => String(x),
      contains: (selected: string | string[] | undefined, value: string) => {
        if (Array.isArray(selected)) {
          return selected.some((x) => x === value);
        }
        return selected === value;
      },
      json: (obj: unknown) => JSON.stringify(obj),
    },
  }),
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
